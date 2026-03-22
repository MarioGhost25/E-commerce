import jwt from "jsonwebtoken";
import { envs } from "./envs";

const ACCESS_SECRET = envs.JWT_ACCESS_SECRET;
const REFRESH_SECRET = envs.JWT_REFRESH_SECRET;
const DEFAULT_ACCESS_EXP = envs.JWT_ACCESS_EXPIRES_IN;
const DEFAULT_REFRESH_EXP = envs.JWT_REFRESH_EXPIRES_IN;

export class JwtAdapter{

    static generateToken = (payload: any, duration: string = DEFAULT_ACCESS_EXP, secret: string = ACCESS_SECRET) => {
        return new Promise<string | null>((resolve) => {
            jwt.sign(payload, secret, {expiresIn: duration }, (err, token) => {
                if(err) return resolve(null);
                resolve(token as string);
            });
        }); 
    }

    static generateAccessToken = (payload: any, duration: string = DEFAULT_ACCESS_EXP) => {
        return this.generateToken(payload, duration, ACCESS_SECRET);
    }

    static generateRefreshToken = (payload: any, duration: string = DEFAULT_REFRESH_EXP) => {
        return this.generateToken(payload, duration, REFRESH_SECRET);
    }

    static validateToken<T> (token: string, secret: string = ACCESS_SECRET): Promise< T | null > {
        return new Promise((resolve) => {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }

    static validateAccessToken<T>(token: string): Promise<T | null> {
        return this.validateToken<T>(token, ACCESS_SECRET);
    }

    static validateRefreshToken<T>(token: string): Promise<T | null> {
        return this.validateToken<T>(token, REFRESH_SECRET);
    }
}
