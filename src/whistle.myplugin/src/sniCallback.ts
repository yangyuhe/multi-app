export default async (
  req: Whistle.PluginSNIRequest,
  options: Whistle.PluginOptions
) => {
  console.log("sniCallback init");
  // return { key, cert }; // 可以返回 false、证书 { key, cert }、及其它
};
