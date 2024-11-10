import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";

export default function HomePosts({ post }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${post.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [post.userId]);
  const handleCardClick = () => {
    navigate(`/post/${post.slug}`);
  };

  const sanitizeContent = (htmlContent) => {
    return htmlContent.replace(/<[^>]+>/g, "");
  };

  return (
    <div
      className="flex flex-col group relative w-full border dark:border-gray-700 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600 overflow-hidden rounded-lg transition-all min-h-[700px] sm:w-[700px] cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative z-10 p-4">
        {user && (
          <div className="flex items-center gap-3">
            <img
              src={user.profilePicture}
              alt={user.username}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-semibold">{user.username}</span>
          </div>
        )}
      </div>
      <div className="absolute top-16 left-0 w-full p-4 flex flex-col gap-2 bg-gradient-to-b from-transparent to-black/60 z-10">
        <h2 className="text-2xl font-bold text-white line-clamp-2">
          {post.title}
        </h2>
        <span className="text-lg italic text-gray-200 truncate">
          {post.category}
        </span>
      </div>
      <div className="">
        <img
          src={post.image}
          alt="portada del post"
          className="h-[460px] w-full object-cover group-hover:opacity-80 transition-opacity duration-300"
        />
      </div>

      <div className="p-5 flex flex-col gap-3 z-10 max-h-[120px] overflow-clip">
        <div className="line-clamp-3">
          <span>{sanitizeContent(post.content)}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-gray-900 p-3 border-t dark:border-gray-700 flex justify-start items-center text-gray-700 dark:text-gray-300 gap-3">
        <div className="flex items-center gap-2">
          <FaThumbsUp className="text-gray-600 dark:text-gray-400" />
          <span className="text-base">{post.numberOfLikes}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCommentAlt className="text-gray-600 dark:text-gray-400" />
          <span className="text-base">{post.numberOfComments}</span>
        </div>
      </div>
    </div>
  );
}
