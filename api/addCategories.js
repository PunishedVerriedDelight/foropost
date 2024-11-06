import mongoose from 'mongoose';
import Category from './models/categorie.model.js'; 

const addCategories = async () => {
    await mongoose.connect(JWT_SECRET); 

    const categories = [
        /*{ name: "Tecnología", description: "Todo sobre las últimas innovaciones y tendencias en tecnología." },
        { name: "Salud", description: "Artículos relacionados con la salud y el bienestar." },
        { name: "Estilo de vida", description: "Consejos y artículos sobre estilo de vida y bienestar." },
        { name: "Educación", description: "Recursos y artículos sobre aprendizaje y educación." }*/
        { name: "Noticias", description: "Noticias del momento." }
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
