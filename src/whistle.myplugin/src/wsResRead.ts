export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("wsResRead init");
  server.on(
    "connect",
    (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
      console.log("wsResRead process");
      socket.pipe(socket);
    }
  );
};
