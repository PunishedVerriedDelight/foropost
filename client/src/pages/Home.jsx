import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import HomePosts from "../components/HomePosts";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex flex-col justify-center gap-6 p-4 px-3 max-w-3xl mx-auto">
        <div className="p-2 max-w-2xl mx-auto w-full">
          <CallToAction />
        </div>
        <h1 className="text-3xl text-center font-bold lg:text-4xl">
          Bienvenido a Foropost
        </h1>
        <p className="text-center text-gray-500 text-xs sm:text-sm">
          Aquí encontrarás gran variedad de temas para investigar, comentar e
          interactuar. Sacia tu curiosidad, comenta y pregunta aquello sobre lo
          que quieres saber.
        </p>
        <Link
          to="/search"
          className="text-center text-xs sm:text-sm text-orange-500 dark:text-indigo-500 font-bold hover:underline"
        >
          Ver todos los posts
        </Link>
      </div>

      <div className="max-w-4xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              Posts Recientes
            </h2>
            <div className="flex flex-col gap-8">
              {posts.map((post) => (
                <HomePosts key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-xs sm:text-sm text-orange-500 dark:text-indigo-500 font-bold hover:underline text-center"
            >
              Ver todos los posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
