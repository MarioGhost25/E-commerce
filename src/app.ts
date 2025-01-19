import { MongoDatabase } from './data';
import { envs } from './config/envs';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/routes';


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

    server.start();

}