import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks";
import userRoutes from "./routes/users";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT ?? 3001;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:3000" }));
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});

export default app;
