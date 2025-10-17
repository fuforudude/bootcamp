import User from '../models/user.js';
import {CustomError} from '../middlewares/errorHandler.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as repo from '../repositories/user.js';

const SECRET_KEY = 'la_cle_tres_tres_tres_secrete_et_tout';

export async function register(userData: { username: string; email: string; password: string; }) {
    const emailUtilise = await User.findOne({email: userData.email});
    if (emailUtilise) {
        throw new CustomError(400, 'SRV_USR_400', 'Email déjà utilisé');
    }
    const newUser = await repo.createUser({ username: userData.username, email: userData.email, password: userData.password });
    return await newUser;
}

export async function login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError(401, 'SRV_AUTH_401', 'Email ou mot de passe incorrect');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new CustomError(401, 'SRV_AUTH_401', 'Email ou mot de passe incorrect');
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    return { token };
}

export async function getProfile(userId: string) {
    const user = await repo.getUserById(userId);
    if (!user) {
        throw new CustomError(404, 'SRV_USR_404', 'Utilisateur non trouvé');
    }
    return user;
}

export async function updateProfile(userId: string, updateData: Partial<{ username: string; email: string; password: string; }>) {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
   await repo.updateUserById(userId, updateData);
   return await repo.getUserById(userId);
}

export async function deleteAccount(userId: string) {
    const user = await repo.deleteUserById(userId);
    if (!user) {
        throw new CustomError(404, 'SRV_USR_404', 'Utilisateur non trouvé');
    }
    return user;
}

export async function getAllUsers() {
    return await repo.getAllUsers();
}