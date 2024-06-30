import zlib from "zlib";

export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions
) => {
  console.log("server init");
  // handle http request
  server.on(
    "request",
    (req: Whistle.PluginServerRequest, res: Whistle.PluginServerResponse) => {
      console.log("server process");

      //处理
      if (false) {
      } else {
        req.passThrough();
      }
    }
  );

  // handle websocket request
  server.on(
    "upgrade",
    (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
      console.log("server upgrade");
      // do something
      req.passThrough();
    }
  );

  // handle tunnel request
  server.on(
    "connect",
    (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
      console.log("server connect");
      // do something
      req.passThrough();
    }
  );
};
