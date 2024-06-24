export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("tunnelReqRead init");
  server.on(
    "connect",
    (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
      console.log("tunnelReqRead process");
      socket.pipe(socket);
    }
  );
};
