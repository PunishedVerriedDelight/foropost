import { Alert, Button, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(comment.length > 300) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
      });
      const data = await res.json();
      if(res.ok){
        setComment('');
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-1">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 dark:text-gray-400 text-sm">
          <p>Usuario actual:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          Tienes que ingresar para comentar.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Ingresar
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
            <Textarea 
                placeholder="Agrega un comentario..."
                rows='3'
                maxLength='300'
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />
            <div className="flex justify-between items-center mt-5">
                <p className="text-gray-500 dark:text-gray-400 text-xs">Te quedan {300 - comment.length} carácteres</p>
                <Button outline gradientDuoTone="purpleToBlue" type="submit">
                    Comentar
                </Button>
            </div>
            {commentError && (
              <Alert color="failure" className="mt-5">{commentError}</Alert>
            )}
        </form>
      )}
    </div>
  );
}
