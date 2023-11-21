echarts服务端渲染工具，生成SVG字符串，公司项目用。

# 使用方法

node版本测试时使用的是`v18.15.0`，但其他版本应该也可行?

0. 执行 `npm i; npm run build` 下载依赖和编译代码到win/linux可执行文件。

1. 编写图表对应js文件，内容如下

```javascript
CHART_PARAM = {
    width: 800, // SVG的宽，高
    height: 600,
    option: {/* 图表的option */}
}
```

2. 将该js文件内容编码为base64，作为参数（不需要加引号）传递给可执行文件：

```
./dist/echart-server-renderer-win.exe <base64内容> > res.svg
```

