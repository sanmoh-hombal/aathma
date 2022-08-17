import express, { Express } from "express";
import { createServer as createHttpServer, Server as HttpServer } from "http";

import bodyParser from "body-parser";
import cors from "cors";

const _PORT: number = Number(process.env.EXPRESS_PORT) || 8080;

const app: Express = express();
const server: HttpServer = createHttpServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "*/*" }));
app.use(cors());

server.listen(_PORT, () => console.log(`[server]: Server is running at http://localhost:${_PORT}`));
