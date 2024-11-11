import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaThumbsUp, FaStar } from "react-icons/fa"; 
import { useSelector } from "react-redux";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [postUser, setPostUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false); 
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const postData = data.posts[0];
        setPost(postData);
        if (postData && currentUser) {
          setLiked(postData.likes.includes(currentUser._id));

          const favRes = await fetch(`/api/favorite/getFavorites`, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });
          const favoritesData = await favRes.json();
          setFavorited(favoritesData.some((fav) => fav._id === postData._id));
        }

        const userRes = await fetch(`/api/user/${postData.userId}`);
        const userData = await userRes.json();
        setPostUser(userData);

        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug, currentUser]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  const handleLike = async () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    try {
      const res = await fetch(`/api/post/likePost/${post._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (res.ok) {
        const updatedPost = await res.json();
        setPost(updatedPost);
        setLiked(updatedPost.likes.includes(currentUser._id));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFavorite = async () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    try {
      const url = favorited
        ? `/api/favorite/removeFavorite/${post._id}`
        : `/api/favorite/addFavorite/${post._id}`;
      const method = favorited ? "DELETE" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (res.ok) {
        setFavorited(!favorited);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  if (error) return <div>Error Cargando el post.</div>;

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen mt-8">
      <div className="max-w-2xl mx-auto">
        {postUser && (
          <div className="flex items-center mb-4 text-sm text-gray-500">
            <img
              src={postUser.profilePicture}
              alt={postUser.username}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>@{postUser.username}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between">
          <h1 className="text-2xl font-sans font-semibold lg:text-3xl flex-1">
            {post && post.title}
          </h1>
          <Link
            to={`/search?category=${post && post.category}`}
            className="mt-2 lg:mt-0 ml-2"
          >
            <Button color="gray" pill size="xs">
              {post && post.category}
            </Button>
          </Link>
        </div>

        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-5 max-h-[900px] w-full object-cover"
        />

        <div className="flex justify-between p-3 border-b border-slate-500 text-xs">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            Tiempo de lectura: {post && (post.content.length / 1000).toFixed(0)}{" "}
            min
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            <button
              onClick={handleLike}
              className={`text-gray-500 hover:text-blue-500 ${
                liked && "!text-blue-500"
              }`}
            >
              <FaThumbsUp className="mr-2" />
            </button>
            {post.numberOfLikes > 0 &&
              post.numberOfLikes +
                " " +
                (post.numberOfLikes === 1 ? " Like" : "Likes")}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            <button
              onClick={handleFavorite}
              className={`text-gray-500 hover:text-yellow-500 ${
                favorited && "!text-yellow-500"
              }`}
            >
              <FaStar className="mr-2" />
            </button>
            {favorited ? "En favoritos" : "Agregar a favoritos"}
          </span>
        </div>
      </div>

      <div
        className="p-1 max-w-2xl mx-auto w-full post-content mt-3"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <div className="p-2 max-w-2xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post && post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Posts recientes</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => (<PostCard key={post._id} post={post} />))}
        </div>
      </div>
    </main>
  );
}
