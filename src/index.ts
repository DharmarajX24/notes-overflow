import {config} from "dotenv"
import {join} from "path"
config({path: join(__dirname, "../.env")})
import {server} from "./server"
import {initSockets} from "./init/sockets";

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
  initSockets(server)
})
