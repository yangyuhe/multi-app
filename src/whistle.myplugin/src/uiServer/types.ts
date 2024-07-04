type ConsoleConfig = {
  domain: string;
  plugin: {
    name: string;
    url: string;
    enable: "on" | undefined;
  }[];
}[];
