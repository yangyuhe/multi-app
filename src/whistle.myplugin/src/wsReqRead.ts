export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("wsReqRead init");
  server.on(
    "connect",
    (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
      console.log("wsReqRead process");
      socket.pipe(socket);
    }
  );
};
