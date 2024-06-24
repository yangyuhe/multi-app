export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("tunnelResRead init");
  server.on(
    "connect",
    (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
      console.log("tunnelResRead process");
      socket.pipe(socket);
    }
  );
};
