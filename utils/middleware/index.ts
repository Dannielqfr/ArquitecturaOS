import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config/index';

interface CustomRequest extends Request {
    user?: any;
    neededRole?: number;
}

function authValidation(role: number) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        req.neededRole = role;
        return validateToken(req, res, next);
    };
}

function validateToken(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Se requiere que inicie sesión.',
        });
    }
    return verifyToken(token, req, res, next);
}

function verifyToken(token: string, req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const decoded = jwt.verify(token.substring(7), config.jwtSecret) as JwtPayload;
        delete decoded.iat;
        delete decoded.exp;
        req.user = decoded;
        return validateRole(req, res, next);
    } catch (error) {
        const { message, name } = error as { message: string; name: string };
        return res.status(403).json({
            success: false,
            message,
            type: name,
        });
    }
}

async function validateRole(req: CustomRequest, res: Response, next: NextFunction) {
    if (req.neededRole === undefined) {
        return res.status(403).json({
            success: false,
            message: 'Permisos insuficientes.',
        });
    }
    // if (req.user.data.role >= req.neededRole) {
    //     if (req.user.data.state === 'Activo') {
            return next();
    //     }
    //     return res.status(403).json({
    //         success: false,
    //         message: 'Permisos denegados - Usuario desactivado.',
    //     });
    // }
    // return res.status(403).json({
    //     success: false,
    //     message: 'Permisos insuficientes.',
    // });
}

export { authValidation };
