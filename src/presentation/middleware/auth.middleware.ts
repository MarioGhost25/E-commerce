
import { NextFunction, Request, RequestHandler, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}

export class AuthMiddleware {

  static validateJWT: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization');

    if (!authorization) {
      res.status(401).json({ error: 'No token provided' });
      return; 
    }

    if (!authorization.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Invalid Bearer token' });
      return; 
    }

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
        res.status(401).json({ error: 'Invalid token' });
        return; 
      }

      const user = await UserModel.findById(payload.id);
      if (!user) {
        res.status(401).json({ error: 'Invalid token - user' });
        return; 
      }

      // Asigna el usuario autenticado a `req.user`
      req.body.user = UserEntity.fromObject(user);

      // Pasa al siguiente middleware o ruta
      next();
    } catch (error) {
      next(error);
    }
  };
}