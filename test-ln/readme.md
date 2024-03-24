1. 软连接源文件被移动后，链接失效，No such file or directory
2. 软连接可以链接文件夹，硬连接不行
3. 硬连接的js文件执行时，实际是在硬连接文件所在位置执行的
4. 软连接的js文件不能被node执行，会报Cannot find module '/Users/cestc/myself/multi-app/test-ln/sub/soft.js'
5. 软连接的文件夹可以被node执行，实际连接到源文件夹处