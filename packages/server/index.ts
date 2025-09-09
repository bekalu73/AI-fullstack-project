import express, { type Request, type Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
