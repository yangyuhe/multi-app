export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("tunnelResWrite init");
  server.on(
    "connect",
    (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
      console.log("tunnelResWrite process");
      socket.pipe(socket);
    }
  );
};
