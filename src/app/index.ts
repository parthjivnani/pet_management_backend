/* eslint-disable prettier/prettier */
import * as swaggerUI from 'swagger-ui-express';
import path = require('path');
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import swaggerDocument from '../swagger/api';
import Routes from '../routes';
import routesLogger from '../middleware/routesLogger';
import { ResponseBuilder } from '../helpers/responseBuilder';
import Log from '../helpers/logger';
import CONSTANTS from '../helpers/constants';
import sequelize from '../config/db';
import mongoose from 'mongoose';
const session = require('express-session');
import mongodb from '../config/db';

const {
  MESSAGES: { ERR_URL_NOT_FOUND },
} = CONSTANTS;

dotenv.config();


export default class App {
  private app: express.Application;
  private responseBuilder: ResponseBuilder;
  private logger = Log.getLogger();

  constructor() {
    this.app = express(); // init the application
    // Connect to the database
    this.db();
    this.configuration();
    this.routes();
    this.responseBuilder = new ResponseBuilder();
   
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment
   * variables it takes the default port 3001
   */
  public configuration() {
    
      this.app.set('port', process.env.PORT || 8080);
    // this.app.use(cors({
    //   //origin: "*",  // Replace with your React app's URL
    //   credentials: true,  // Allow credentials (cookies, authorization headers)
    // }));
    const corsConfig = {
      origin: true,
      credentials: true,
    };
    this.app.use(cors(corsConfig));
    this.app.options('*', cors(corsConfig))
    this.app.use(express.json());
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    this.app.use(session({
      secret: "cms poc", // Change this to a random string
      cookie: { maxAge: 300000 }, // Set session expiration time Session expire after 5 min
      resave: false,
      saveUninitialized: true
    }));

    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, authorization, token, language, x-device-type, x-app-version, x-build-number, uuid,x-auth-token,X-L10N-Locale");
      res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });
  }

  public async db() {
    // Import the database connection from config
    await mongodb.readyState;
    // Sync database connection
    await mongoose.connection.syncIndexes();
    console.log('Database indexes synced successfully');

  }

  /**
   * Method to configure the routes
   */
  public async routes() {
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(cookieParser());
    const routes = new Routes();
    this.app.use(routesLogger);
    this.app.use('/api', routes.path());
    this.app.use('/public', express.static(path.join('public')));
    this.app.use('/*', (req: express.Request, res: express.Response) =>
      this.responseBuilder.responseContent(res, 404,false, ERR_URL_NOT_FOUND),
    );
    
  }

  

  /**
   * Used to start the server
   */
  public async start() {
    const host = process.env.HOST_SERVER;
    this.app.listen(this.app.get('port'), () => {
      this.logger.info(
        `Server is running at http://${host}:${this.app.get('port')}.`,
      );
    });
  }
}

const server = new App(); // Create server instance
server.start(); // Execute the server
