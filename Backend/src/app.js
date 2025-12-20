
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
 import userRouter from './routes/user.routes.js'
 import postRouter from './routes/post.routes.js'

//routes declaration
app.use("/api/v2/users", userRouter)
app.use("/api/v2/posts", postRouter)

export { app }