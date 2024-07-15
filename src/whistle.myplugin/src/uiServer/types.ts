type ConsoleConfig = {
  domain: string;
  disabledPlugins: string;
  plugin: {
    name: string;
    url: string;
    enable: "on" | undefined;
  }[];
}[];
