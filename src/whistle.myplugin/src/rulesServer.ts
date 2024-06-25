export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("rulesServer init");
  server.on(
    "request",
    (req: Whistle.PluginRequest, res: Whistle.PluginResponse) => {
      console.log("rulesServer process");
      console.log(req.fullUrl);
      res.end();
    }
  );
};
