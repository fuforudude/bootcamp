import { CustomError } from "../middlewares/errorHandler.js";
import User from "../models/user.js";

export async function getAllUsers() 
{
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            throw new CustomError(404, 'REPO_USR_404', 'Aucun utilisateur trouvé.');
        }
        return users;
    } catch (error) {
            throw new CustomError(500, 'REPO_USR_500', 'Failed to fetch users');
    }
}

export async function getUserById(id: string) 
{
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new CustomError(404, 'REPO_USR_404', 'Utilisateur non trouvé.');
        }
        return user;
    } catch (error) {
    throw new CustomError(500, 'REPO_USR_500', 'Failed to fetch user');
    }
}
export async function deleteUserById(id: string) 
{
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new CustomError(404, 'REPO_USR_404', 'Utilisateur non trouvé.');
        }
        return user;
    } catch (error) {
    throw new CustomError(500, 'REPO_USR_500', 'Failed to delete user');
    }
}

export async function updateUserById(id: string, updateData: Partial<{ name: string; email: string; password: string; }>) 
{
    try {
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!user) {
            throw new CustomError(404, 'REPO_USR_404', 'Utilisateur non trouvé.');
        }
        return user;
    } catch (error) {
    throw new CustomError(500, 'REPO_USR_500', 'Failed to update user');
    }
}

export async function createUser(userData: { username: string; email: string; password: string; }) 
{
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
    throw new CustomError(500, 'REPO_USR_500', 'Failed to create user');
    }
}