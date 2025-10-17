import * as services from '../services/serviceUser.js'
import { CustomError } from '../middlewares/errorHandler.js'
import { Request, Response, NextFunction } from 'express'

export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const user = await services.getProfile(id)
        if (!user) {
            throw new CustomError(404, 'CTR_USER_NOT_FOUND', 'Utilisateur non trouvé')
        }
        res.status(200).json({ message: 'Utilisateur récupéré avec succès', data: user })
    } catch (error) {
        next(error)
    }
}

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await services.getAllUsers()
        res.status(200).json({ message: 'Utilisateurs récupérés avec succès', data: users })
    } catch (error) {
        next(error)
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const updateData = req.body
        const updatedUser = await services.updateProfile(id, updateData)
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', data: updatedUser })
    } catch (error) {
        next(error)
    }
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            throw new CustomError(400, 'CTR_USER_400', 'Champs manquants')
        }
        const newUser = await services.register({ username, email, password })
        res.status(201).json({ message: 'Utilisateur créé avec succès', data: newUser })
    } catch (error) {
        next(error)
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const deletedUser = await services.deleteAccount(id)
        res.status(200).json({ message: 'Utilisateur supprimé avec succès', data: deletedUser })
    } catch (error) {
        next(error)
    }
}