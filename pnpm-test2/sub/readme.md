1. 虽然父母路设置了当前文件夹是storedir, 但是子目录还是以/Users/cestc/Library/pnpm/store/v3为storedir
2. 修改v3下的某个包后，再次安装--reporter=ndjson ,会发现pnpm侦测到包被更改，会重新写下载包