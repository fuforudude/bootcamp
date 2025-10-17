import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { CustomError } from './errorHandler.js';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const SECRET_KEY = 'la_cle_tres_tres_tres_secrete_et_tout'


export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    // console.log(authHeader)
    
        if (!authHeader) {
            const error = new CustomError(401, 'MIDDLEWARE_AUTH_TOKEN', 'Token manquant')
            return next(error)
        }

    const token = authHeader.split(' ')[1]
    
        if (!token) {
            const error = new CustomError(401, 'MIDDLEWARE_TOKEN_MISSING', 'Token manquant')
            return next(error)
        }
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
            const err = new CustomError(401, 'MIDDLEWARE_TOKEN_INVALID', 'Token invalide')
            return next(err)
    }
}