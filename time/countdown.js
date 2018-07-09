var WINDOW_WIDTH = 1366;
var WINDOW_HEIGHT = 662;
var R = 8;
var MARGIN_TOP = 30;
var MARGIN_LEFT = 160;

// const endTime = new Date();
// endTime.setTime(endTime.getTime()+3600*1000); //一小时=3600s=3600*1000ms
var curSeconds = 0;

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#669900", "#FFBB33", "#aa66dd", "#ee88cc", "#acd56", "#22DDAA"];

window.onload = function () {

    WINDOW_HEIGHT = document.body.clientHeight;
    WINDOW_WIDTH = document.body.clientWidth;
    R = Math.round(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP = WINDOW_HEIGHT/5;
    MARGIN_LEFT =Math.round(WINDOW_WIDTH/10);


    var canvas = document.getElementById("canvas");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    var context = canvas.getContext("2d");
    curSeconds = getCurrentSeconds();
    setInterval(
        function () {
            render(context);
            updata();
        },
        50
    );
}

function getCurrentSeconds() {
    //倒计时
    // var startTime = new Date();
    // var ret = endTime.getTime() - startTime.getTime(); //毫秒
    // ret = Math.round(ret / 1000); //毫秒转换成秒
    // return ret > 0 ? ret : 0;

    //时钟
    var curTime = new Date();
    var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
    return ret;
}


//下一秒！= 当前秒数     当前秒数 = 下一秒
function updata() {

    var nextSeconds = getCurrentSeconds();

    var nexthours = parseInt(nextSeconds / 3600);
    var nextminutes = parseInt((nextSeconds - nexthours * 3600) / 60);
    var nextseconds = parseInt(nextSeconds % 60);

    var hours = parseInt(curSeconds / 3600);
    var minutes = parseInt((curSeconds - hours * 3600) / 60);
    var seconds = parseInt(curSeconds % 60);

    if (nextSeconds != curSeconds) {
        if (parseInt(nexthours / 10) != parseInt(hours / 10)) {
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10));
        }
        if (parseInt(nexthours % 10) != parseInt(hours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (R + 1), MARGIN_TOP, parseInt(hours % 10));
        }
        if (parseInt(nextminutes / 10) != parseInt(minutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (R + 1), MARGIN_TOP, parseInt(minutes / 10));
        }
        if (parseInt(nextminutes % 10) != parseInt(minutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (R + 1), MARGIN_TOP, parseInt(minutes % 10));
        }
        if (parseInt(nextseconds / 10) != parseInt(seconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (R + 1), MARGIN_TOP, parseInt(seconds / 10));
        }
        if (parseInt(nextseconds % 10) != parseInt(seconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(seconds % 10));
        }
        curSeconds = nextSeconds;
    }
    upBalls();
}

function addBalls(x, y, num) {

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (R + 1) + (R + 1),
                    y: y + i * 2 * (R + 1) + (R + 1),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    g: 1.5 + Math.random(),
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall);
            }
        }
    }

}

function upBalls() {

    for (var i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - R) {
            balls[i].y = WINDOW_HEIGHT - R;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    //性能优化
    var count = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + R > 0 && balls[i].x - R < WINDOW_WIDTH) {
            balls[count++] = balls[i];
        }
    }
    while (balls.length > Math.min(300, count)) {
        balls.pop();
    }
}

function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    //画时间
    var hours = parseInt(curSeconds / 3600);
    var minutes = parseInt((curSeconds - hours * 3600) / 60);
    var seconds = parseInt(curSeconds % 60);
    renderGit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderGit(MARGIN_LEFT + 15 * (R + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderGit(MARGIN_LEFT + 30 * (R + 1), MARGIN_TOP, 10, ctx);
    renderGit(MARGIN_LEFT + 39 * (R + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderGit(MARGIN_LEFT + 54 * (R + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderGit(MARGIN_LEFT + 69 * (R + 1), MARGIN_TOP, 10, ctx);
    renderGit(MARGIN_LEFT + 78 * (R + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderGit(MARGIN_LEFT + 93 * (R + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);


    //画小球
    for (var i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, R, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fillStyle = balls[i].color;
        ctx.fill();
    }
}

function renderGit(x, y, num, ctx) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + 2 * (R + 1) * j + (R + 1), y + 2 * (R + 1) * i + (R + 1), R, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fillStyle = "rgb(0,102,153)";
                ctx.fill();
            }
        }
    }
}