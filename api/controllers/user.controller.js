import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({ message: 'API funcionando' });
}

export const updateUser = async (req, res, next) => {
    //console.log('User ID from token:', req.user.id);
    //console.log('User ID from params:', req.params.userId);
    if (req.user.id !== req.params.userId){
        return next(errorHandler(403, 'No tienes permitido actualizar este usuario'));
    }
    if (req.body.password){
        /*const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(req.body.password)) {
            return next(errorHandler(400, 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.'));
        }*/
            if (req.body.password.length < 8) {
                return next(errorHandler(400, 'La contraseña debe tener al menos 8 caracteres.'));
            }
            if (!/[a-z]/.test(req.body.password)) {
                return next(errorHandler(400, 'La contraseña debe contener al menos una letra minúscula.'));
            }
            if (!/[A-Z]/.test(req.body.password)) {
                return next(errorHandler(400, 'La contraseña debe contener al menos una letra mayúscula.'));
            }
            if (!/\d/.test(req.body.password)) {
                return next(errorHandler(400, 'La contraseña debe contener al menos un número.'));
            }
            if (!/[@$!%*?&]/.test(req.body.password)) {
                return next(errorHandler(400, 'La contraseña debe contener al menos un carácter especial.'));
            }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username){
        if(req.body.username.length < 8 || req.body.username.length > 20){
            return next(errorHandler(400, 'El nombre de usuario debe tener entre 8 y 20 caracteres'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'El nombre de usuario no puede contener espacios'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandlerandler(400, 'El nombre de usuario debe estar solo en minusculas'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'El nombre de usuario solo puede tener letras y numeros'));
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            }, { new: true });
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    }
};