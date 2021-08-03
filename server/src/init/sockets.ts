import {Server} from "socket.io"
import {handleSocketEvents} from "../handlers/sockets";

let io: Server

export const initSockets = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: true,
      credentials: true
    }
  })

  handleSocketEvents(io)
}

