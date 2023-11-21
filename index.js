const echarts = require('echarts');
// const { createCanvas } = require('canvas');
const { writeFileSync } = require('fs');
const { argv } = require('process');
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
if (argv.length != 3) {
    throw new Error("a base64 must be given");
}
eval(fromBase64(argv[2]))
if (!CHART_PARAM) {
    throw new Error('variable CHART_PARAM not found')
}
const {width, height, option} = CHART_PARAM

// 通过输出流返回结果SVG字符串
console.log(renderSvgStr(width, height, option))