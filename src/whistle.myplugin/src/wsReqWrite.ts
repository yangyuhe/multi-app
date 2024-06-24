export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("wsReqWrite init");
  server.on(
    "connect",
    (req: Whistle.PluginRequest, socket: Whistle.PluginSocket) => {
      console.log("wsReqWrite process");
      socket.pipe(socket);
    }
  );
};
