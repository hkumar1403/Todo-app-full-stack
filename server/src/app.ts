import express from "express";
import todoRoutes from "./routes/todo.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://todo-app-full-stack-eight.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from TypeScript Express!");
});
app.get("/test", (req, res) => {
  res.send("Backend working");
});

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

export default app;
