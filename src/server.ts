import express from "express";

export default function runServer() {
  const app = express();
  const port = 3333;

  app.get(
    "/health/readiness",
    (_req: any, res: { send: (arg0: { healthy: boolean }) => void }) => {
      res.send({ healthy: true });
    }
  );

  const testEndpointResponse = (
    _req: any,
    res: { send: (arg0: { foo: string }) => void }
  ) => {
    res.send({ foo: "bar" });
  };

  app.get("/test01", testEndpointResponse);

  app.get("/test02", testEndpointResponse);

  app.get("/test03", testEndpointResponse);

  app.get("/test04", testEndpointResponse);

  app.get("/test05", testEndpointResponse);

  app.get("/test06", testEndpointResponse);

  app.get("/test07", testEndpointResponse);

  app.get("/test08", testEndpointResponse);

  app.get("/test09", testEndpointResponse);

  app.get("/test10", testEndpointResponse);

  return app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Example app listening on port ${port}`);
  });
}
