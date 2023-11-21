const echarts = require('echarts');
// const { createCanvas } = require('canvas');
const { writeFileSync, readFileSync } = require('fs');
const { program } = require('commander')
// function renderCanvas(width, height, echartOptions) {
//     const canvas = createCanvas(width, height);
//     // ECharts can use the Canvas instance created by node-canvas as a container directly
//     const chart = echarts.init(canvas);
//     // setOption as normal
//     chart.setOption(echartOptions);
//     const buffer = canvas.toBuffer('image/png');
//     chart.dispose();
//     return buffer
// }
function renderSvgStr(width, height, echartOptions) {
    const chart = echarts.init(null, null, {
        renderer: 'svg', // must use SVG rendering mode
        ssr: true, // enable SSR
        width, // need to specify height and width
        height
      });
    // setOption as normal
    chart.setOption(echartOptions);
    const res = chart.renderToSVGString()
    chart.dispose();
    return res;
}

function fromBase64(str) {
    return Buffer.from(str, 'base64').toString('utf8')
}
function toBase64(str) {
    return Buffer.from(str).toString('base64')
}

program
    .description("渲染echarts图标到SVG，其中图表定义和图表数据均使用base64编码；在图表定义中可以使用echarts库中的玩意（const echarts=require('echarts')）")
    .option('-f, --file', '允许传文件名而非base64，测试用')
    .option('-o, --output-file <file_name>', '指定输出到文件而非输出流，测试用')
    .option('-w, --width <pixels>', 'svg宽度', 800)
    .option('-h, --height <pixels>', 'svg高度', 600)
    .argument('<chartDefinition>', '必填，图表定义，为base64编码的js片段，其必须在顶层引入函数CHART_DEF，其接受单个参数data，为chartData中引入的变量 CHART_DATA')
    .argument('[chartData]', '选填，图表所使用的数据，为base64编码的js片段，其必须在顶层引入变量CHART_DATA，不传时默认为base64("CHART_DATA={}")', toBase64('CHART_DATA={}'));

program.parse();
const {width, height, file: withFile, outputFile} = program.opts()
const [chartDefinition, chartData] = program.args

if (withFile) {
    try {
        const chartDefStr = readFileSync(chartDefinition).toString('utf8')
        eval(chartDefStr)
    } catch (e) {
        console.error(`eval 文件 ${chartDefinition} 失败，请检查其是否存在且是合法js文件`)
        throw e
    }
    try {
        const chartDataStr = readFileSync(chartData).toString('utf8')
        eval(chartDataStr)
    } catch (e) {
        console.error(`eval 文件 ${chartData} 失败，请检查其是否存在且是否是合法js文件`)
        throw e
    }
} else {
    try {
        eval(fromBase64(chartDefinition))
    } catch (e) {
        console.error(`解析 chartDefinition 失败，请检查其是否是使用base64编码后的合法的js片段`)
        throw e
    }
    try {
        eval(fromBase64(chartData))
    } catch (e) {
        console.error('解析 chartData 失败，请检查其是否是使用base64编码后的合法的js片段')
        throw e
    }
}


if (!CHART_DEF) {
    throw 'function CHART_DEF not found or is nullish!'
}
if (!CHART_DATA) {
    throw 'variable CHART_DATA not found or is nullish!'
}
// 通过输出流返回结果SVG字符串
const result = renderSvgStr(width, height, CHART_DEF(CHART_DATA))
if (outputFile) {
    writeFileSync(outputFile, result)
} else {
    console.log(result)
}