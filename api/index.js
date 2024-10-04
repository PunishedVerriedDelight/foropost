import express from 'express';

const app = express();

app.listen(3000, () => {
    console.log('El servidor esta corriendo en el puerto 3000!');
});