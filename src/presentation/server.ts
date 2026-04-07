
import express, { Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { envs } from '../config/envs';

interface Options{
    port: number,
    routes: Router
}

export class Server{

    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options){
        const {port, routes} = options;
        this.port = port;
        this.routes = routes;
    }

    async start(){
        

        this.app.use( express.json({limit: '10mb'}) );
        this.app.use( express.urlencoded({ extended: true, limit: '10mb' }) );
        this.app.use(cookieParser());


        //* CORS
        const allowedOrigins = (envs.CORS_ORIGIN || 'http://localhost:5173')
            .split(',')
            .map(origin => origin.trim().replace(/\/+$/, ''))
            .filter(Boolean);

        this.app.use(cors({
            origin: (origin, callback) => {
                if (!origin) return callback(null, true);

                const normalizedOrigin = origin.replace(/\/+$/, '');
                return callback(null, allowedOrigins.includes(normalizedOrigin));
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        //* gateway routes
        this.app.use(this.routes);

        //* start server
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    public stop(){
        this.serverListener?.close();
    }


}
