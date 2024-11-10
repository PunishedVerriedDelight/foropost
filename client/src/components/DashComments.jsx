import { Modal, Table, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          const userComments = currentUser.isAdmin
            ? data.comments
            : data.comments.filter(
                (comment) => comment.userId === currentUser._id
              );
          setComments(userComments);
          if (userComments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
    fetchComments();
    fetchPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPost = (postId) => {
    return posts.find((post) => post._id === postId) || {};
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : "Usuario no encontrado";
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md text-center">
            <Table.Head>
              <Table.HeadCell>Creación/edit</Table.HeadCell>
              <Table.HeadCell>Comentario</Table.HeadCell>
              <Table.HeadCell>No. de likes</Table.HeadCell>
              <Table.HeadCell>Post</Table.HeadCell>
              {currentUser.isAdmin && <Table.HeadCell>Usuario</Table.HeadCell>}
              <Table.HeadCell>Eliminar</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body key={comment._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-xs font-medium text-gray-600 dark:text-gray-300"
                        to={`/post/${getPost(comment.postId).slug}`}
                      >
                        {getPost(comment.postId).title || "Post no encontrado"}
                      </Link>
                    </Table.Cell>
                  </Table.Cell>
                  {currentUser.isAdmin && (
                    <Table.Cell>{getUserName(comment.userId)}</Table.Cell>
                  )}
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="text-xs font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Eliminar
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Mostrar más
            </button>
          )}
        </>
      ) : (
        <p>No tienes comentarios para ver por el momento</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <Modal.Header
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        />
        <Modal.Body
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 mb-4 mx-auto" />
            <h3
              className={`mb-5 text-lg ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              ¿Estás seguro de que quieres eliminar este comentario?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Sí, Estoy seguro
              </Button>
              <Button color="cyan" onClick={() => setShowModal(false)}>
                No, Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
