import {Server} from "socket.io"
import MeilisearchDAO from "../dao/meilisearchDAO";
import {verifyToken} from "../api/middlewares/auth";

export const handleSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`)
    socket.on("search", async (query) => {
      console.log(`Query: ${JSON.stringify(query)}`)
      const {token, q, offset, directory_id} = query
      try {
        const {sub} = verifyToken(token)
        console.log(sub)
        const {hits} = await MeilisearchDAO.queryDocuments({query: q, user_id: sub as string, offset, directory_id})
        socket.emit("results", hits.map(({added_at, name, text}) => ({added_at, name, text})))
      } catch (e) {
        console.log(e)
        socket.emit("error", "Unauthorized")
      }
    })
  })
}

