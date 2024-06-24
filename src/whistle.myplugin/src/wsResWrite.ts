export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("wsResWrite init");
  server.on(
    "connect",
    (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
      console.log("wsResWrite process");
      socket.pipe(socket);
    }
  );
};
