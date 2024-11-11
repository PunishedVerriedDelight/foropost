import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full border dark:border-gray-700 hover:border-2 overflow-hidden rounded-lg transition-all h-[355px] sm:w-[360px]">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="portada del post"
          className="h-[220px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] 
          left-0 right-0 border border-rose-500 text-rose-500 hover:bg-gradient-to-r hover:from-rose-500 hover:to-yellow-500
           dark:border-indigo-500 dark:text-indigo-500 hover:dark:bg-gradient-to-r hover:dark:from-indigo-500 hover:dark:to-blue-600
           hover:text-white dark:hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Ir al post
        </Link>
      </div>
    </div>
  );
}
