import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRotes from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(
    () => { console.log('MongoDB conectado')

    }).catch((err) => {
        console.log(err);
    });

const app = express();

app.listen(3000, () => {
    console.log('El servidor esta corriendo en el puerto 3000!');
});

app.use('/api/user', userRotes);