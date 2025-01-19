import mongoose from "mongoose";

interface Options {
    dbUrl: string;
    dbName: string;
}

export class MongoDatabase {
    
    static async connect(options: Options) {

        const {dbUrl, dbName} = options

        try {

            await mongoose.connect(dbUrl, {
                dbName: dbName,
            })
            
        } catch (error) {
            console.error("Error connecting to database: ");
            throw error;
        }
    }

    static async disconnect() {
        await mongoose.disconnect();
    }

}