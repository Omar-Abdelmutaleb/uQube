import express from "express"
import dotenv from "dotenv"
import connectDB from "./db.js"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()
app.use(cors())

app.use(cookieParser())
app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth", authRoutes)

// De mnzmaly shakl el error msh aktr
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status*1).json({
        success: false,
        status,
        message,
    })
})

app.listen(5000, () => {
    connectDB()
    console.log("Server is running on PORT 5000");
})