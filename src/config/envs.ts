import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

    PORT: get('PORT').required().asPortNumber(),

    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    MONGO_USER: get('MONGO_USER').required().asString(),
    MONGO_PASSWORD: get('MONGO_PASSWORD').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    JWT_ACCESS_SECRET: get('JWT_ACCESS_SECRET').default(get('JWT_SEED').required().asString()).asString(),
    JWT_REFRESH_SECRET: get('JWT_REFRESH_SECRET').default(get('JWT_SEED').required().asString()).asString(),
    JWT_ACCESS_EXPIRES_IN: get('JWT_ACCESS_EXPIRES_IN').default('15m').asString(),
    JWT_REFRESH_EXPIRES_IN: get('JWT_REFRESH_EXPIRES_IN').default('7d').asString(),
    REFRESH_TOKEN_COOKIE_NAME: get('REFRESH_TOKEN_COOKIE_NAME').default('rt').asString(),
    CORS_ORIGIN: get('CORS_ORIGIN').default('').asString(),
    STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString(),
    CLOUDINARY_CLOUD_NAME: get('CLOUDINARY_CLOUD_NAME').required().asString(),
    CLOUDINARY_API_KEY: get('CLOUDINARY_API_KEY').required().asString(),
    CLOUDINARY_API_SECRET: get('CLOUDINARY_API_SECRET').required().asString(),

}