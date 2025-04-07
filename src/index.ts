import { Hono } from "hono";
import diagramRouter from "./routes/diagram.contoller";


const app = new Hono<{ Bindings: CloudflareBindings }>();

app.route("/worker/api/v1", diagramRouter);

export default app;
