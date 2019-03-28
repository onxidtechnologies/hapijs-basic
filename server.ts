import { Server } from 'hapi';
import * as mongoose from 'mongoose';

export class APIServer {
    private server: Server;

    constructor() {
        mongoose.connect(
            'mongodb://demo:demo123@ds213832.mlab.com:13832/hapijs-basic',
            { useNewUrlParser: true }
        );

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        mongoose.connection.on('error', () => {
            console.log('Error while conneting to MongoDB');
        });
    }

    public async init() {
        // Create a server with a host and port
        this.server = Server({
            host: 'localhost',
            port: 8000
        });

        // Add the route
        this.server.route({
            method: 'GET',
            path: '/hello',
            handler: function (request, h) {

                return 'hello world';
            }
        });

        try {
            await this.server.start();
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }

        console.log('Server running at:', this.server.info.uri);
    }
}
