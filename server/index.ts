import express, { Express } from "express";
import { createServer as createHttpServer, Server as HttpServer } from "http";
import { Server as SocketIoServer, Socket } from "socket.io";

import bodyParser from "body-parser";
import cors from "cors";

import { UpvoteHandler as registerUpvoteHandlers } from "@server/handlers";
import { CommentRouter, UpvoteRouter, UserRouter } from "@server/routes";

const _PORT: number = Number(process.env.EXPRESS_PORT) || 8080;

const app: Express = express();
const server: HttpServer = createHttpServer(app);
const io: SocketIoServer = new SocketIoServer(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "*/*" }));
app.use(cors());

app.use("/comment", CommentRouter);
app.use("/upvote", UpvoteRouter);
app.use("/user", UserRouter);

const onConnection = (socket: Socket) => {
	registerUpvoteHandlers(io, socket);
};

io.on("connection", (socket: Socket) => {
	console.log(`[socket]: New Client Connected ${socket.id}`);
	onConnection(socket);
	socket.on("disconnect", () => console.log(`[socket]: Client Disconnected ${socket.id}`));
});

server.listen(_PORT, () => console.log(`[server]: Server is running at http://localhost:${_PORT}`));
