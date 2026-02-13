import express from "express";
import todoRoutes from "./routes/todo.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from TypeScript Express!");
});
app.get("/test", (req, res) => {
  res.send("Backend working");
});

app.use("/api/todos", todoRoutes);

export default app;
