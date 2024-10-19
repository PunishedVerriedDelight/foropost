import mongoose from 'mongoose';
import Category from './models/categorie.model.js'; 

const addCategories = async () => {
    await mongoose.connect('mongodb+srv://amontoyasv:amontoyasv1998@mern-blog.zzp3o.mongodb.net/foroppost?retryWrites=true&w=majority&appName=mern-blog'); 

    const categories = [
        { name: "Tecnología", description: "Todo sobre las últimas innovaciones y tendencias en tecnología." },
        { name: "Salud", description: "Artículos relacionados con la salud y el bienestar." },
        { name: "Estilo de vida", description: "Consejos y artículos sobre estilo de vida y bienestar." },
        { name: "Educación", description: "Recursos y artículos sobre aprendizaje y educación." }
    ];

    try {
        await Category.insertMany(categories);
        console.log('Categorías agregadas exitosamente.');
    } catch (error) {
        console.error('Error al agregar categorías:', error);
    } finally {
        await mongoose.disconnect();
    }
};

addCategories();
