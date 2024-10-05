import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRotes from './routes/user.route.js';
import authRotes from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(
    () => { console.log('MongoDB conectado')

    }).catch((err) => {
        console.log(err);
    });

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('El servidor esta corriendo en el puerto 3000!');
});

app.use('/api/user', userRotes);
app.use('/api/auth', authRotes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error Interno del Server';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});