export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("tunnelReqWrite init");
  server.on(
    "connect",
    (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
      console.log("tunnelReqWrite process");
      socket.pipe(socket);
    }
  );
};
