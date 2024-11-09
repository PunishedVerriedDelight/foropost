import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRotes from './routes/user.route.js';
import authRotes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import categoryRoutes from './routes/categorie.route.js';
import postRoutes from './routes/post.route.js'; 
import commentRoutes from './routes/comment.route.js'; 

dotenv.config();

mongoose.connect(process.env.MONGO).then(
    () => { console.log('MongoDB conectado')

    }).catch((err) => {
        console.log(err);
    });

const app = express();

app.use(cookieParser());
app.use(express.json());

app.listen(3000, () => {
    console.log('El servidor esta corriendo en el puerto 3000!');
});

app.use('/api/user', userRotes);
app.use('/api/auth', authRotes);
app.use('/api/categories', categoryRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error Interno del Server';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});