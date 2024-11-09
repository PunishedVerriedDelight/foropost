import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CallToAction from "../components/CallToAction";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

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
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen mt-8">
      <div className="max-w-2xl mx-auto">
        {currentUser && (
          <div className="flex items-center mb-4 text-sm text-gray-500">
            <img
              src={currentUser.profilePicture}
              alt={currentUser.username}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>@{currentUser.username}</span>
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
        </div>
      </div>

      <div
        className="p-1 max-w-2xl mx-auto w-full post-content mt-3"
        dangerouslySetInnerHTML={{ __html: post && post.content }}>
        </div>
        <div className="p-2 max-w-2xl mx-auto w-full">
            <CallToAction />
        </div>
    </main>
  );
}
