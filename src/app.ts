import { MongoDatabase } from './data';
import { envs } from './config/envs';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/routes';
import { env } from 'process';


( async () => {
    main();

})();

async function main() {

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        dbUrl: envs.MONGO_URL,
    });

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,

    });

    console.log(process.env)

    server.start();

}