import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Crea un post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Titulo"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-cyan-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Subir imagen
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Escribe algo..."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="pinkToOrange">
          Publicar
        </Button>
      </form>
    </div>
  );
}
