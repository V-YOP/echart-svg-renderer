echarts服务端渲染工具，生成SVG字符串，公司项目用。

# 使用方法

node版本测试时使用的是`v18.15.0`，但其他版本应该也可行。

1. 执行 `npm i; npm run build` 下载依赖和编译代码到win/linux可执行文件。
2. 编写图表对应图表定义和数据文件，参照`./dist/echart-server-renderer-win.exe --help`以及目录下的`exampleChartDef.js`和`exampleChartData.js`
3. 执行 `./dist/echart-server-renderer-win.exe -w <图表宽度> -h <图表高度> -f <图表定义js文件名> <数据定义js文件名> > result.svg`
4. 检查输出结果

考虑数据定义由后端提供，图表定义由前端编写，其对数据进行转化并构造最终的option。

考虑测试时使用-f传递js文件名，生产环境使用base64在后台进行调用；获取图表定义和数据定义使用了eval，因此在后台调用时应当始终从数据库拿图表定义，并手动构造数据定义。

