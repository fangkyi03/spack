# 安装
npm i 

# 使用 
npm run dev 

# 介绍
spack有别于snowpack 其本质上只有两个概念 一个loader一个plugin
将这两个概念又结合类似redux中间件的思想 将所有行为当做一个active一样去执行

初始化执行 -> 加载完所有的loader -> plugin

单个文件改变 -> 加载完指定文件类型的loader -> plugin

对loader与plugin内部暴露了一个state彼此之间可以通过这个state来进行数据的传递

如jsloader将扫描js里面用到的import同时将转换以后的数据存入缓存中 在rollup这个plugin中

就可以直接通过jsloader写入的state来判断是否要执行压缩


# 未完成功能
1.less sass

# 已完成功能
1.cssModules
2.简易热更新
