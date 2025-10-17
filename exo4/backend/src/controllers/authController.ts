import * as service from '../services/serviceUser.js'
import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../middlewares/errorHandler.js'

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            throw new CustomError(400, 'CTR_AUTH_400', 'Champs manquants')
        }
        const newUser = await service.register({ username, email, password })
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser })
    } catch (error) {
        next(error)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            throw new CustomError(400, 'CTR_AUTH_400', 'Champs manquants')
        }

        const { token } = await service.login(email, password)
        res.status(200).json({ message: 'Connexion réussie', data: { token } })
    } catch (error) {
        next(error)
    }
}

export async function connectedUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId
        if (!userId) {
            throw new CustomError(401, 'CTR_AUTH_401', 'User pas authentifié')
        }
    const user = await service.getProfile(userId)
        res.status(200).json({ message: 'Profil recup', data: user })
    } catch (error) {
        next(error)
    }
}