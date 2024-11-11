import { Modal, Table, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashFavorites() {
  const { currentUser } = useSelector((state) => state.user);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToUnfavorite, setPostIdToUnfavorite] = useState('');
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`/api/favorite/getFavorites`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setFavoritePosts(data);
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = favoritePosts.length;
    try {
      const res = await fetch(`/api/favorite/getFavorites?startIndex=${startIndex}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFavoritePosts((prev) => [...prev, ...data]);
        if (data.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnfavoritePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/favorite/removeFavorite/${postIdToUnfavorite}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFavoritePosts((prev) => prev.filter((post) => post._id !== postIdToUnfavorite));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {favoritePosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md text-center">
            <Table.Head>
              <Table.HeadCell>Información Actualizada</Table.HeadCell>
              <Table.HeadCell>Imagen del post</Table.HeadCell>
              <Table.HeadCell>Titulo del post</Table.HeadCell>
              <Table.HeadCell>Categoria</Table.HeadCell>
              <Table.HeadCell>Eliminar de favoritos</Table.HeadCell>
            </Table.Head>
            {favoritePosts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToUnfavorite(post._id);
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
            <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
              Mostrar más
            </button>
          )}
        </>
      ) : (
        <p>Aún no tienes publicaciones en tus favoritos</p>
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
            theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
          }`}
        />
        <Modal.Body
          className={`${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 mb-4 mx-auto" />
            <h3
              className={`mb-5 text-lg ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              ¿Estás seguro de que quieres eliminar esta publicación de tus favoritos?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleUnfavoritePost}>
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