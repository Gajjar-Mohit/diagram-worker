import { Hono } from "hono";
import {
  generateCreateDiagramTemplate,
  generateDiagramSystemPrompt,
} from "../promts/diagram.promt";

const diagramRouter = new Hono<{ Bindings: CloudflareBindings }>();

diagramRouter.get("/status", (c) => {
  return c.json({
    status: "RUNNING",
    version: "1.0.0",
  });
});

diagramRouter.post("/generate-diagrams", async (c) => {
  const { project_name, defination, key_features } = await c.req.json();
  if (!project_name || !defination || !key_features) {
    return c.json({
      status: "ERROR",
      message: "Missing required fields",
    });
  }

  const promt = generateCreateDiagramTemplate(
    project_name,
    defination,
    key_features
  );

  const result = await c.env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
    messages: [
      {
        role: "system",
        content: generateDiagramSystemPrompt(),
      },
      {
        role: "user",
        content: promt,
      },
    ],
    temperature: 0.7,
    max_tokens: 8000,
  });

  if (!result) {
    return c.json({
      status: "ERROR",
      message: "Failed to generate diagrams",
    });
  }
  var data = JSON.stringify(result);
  var jsonData = JSON.parse(data);
  var res = jsonData.response;

  return c.json({
    status: "SUCCESS",
    message: "Diagram generated successfully",
    data: res,
    version: "1.0.0",
  });
});

export default diagramRouter;
