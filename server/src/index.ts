import {config} from "dotenv"
import {join} from "path"

config({path: join(__dirname, "../.env")})

import app from "./server"

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
