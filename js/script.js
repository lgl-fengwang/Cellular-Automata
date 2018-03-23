var heightNumber = 150; // 垂直方向数量
var widthNumber = 300; // 水平方向数量
var initialLife = 8000; // 初始生命数量
var lifes = [];
var context; // 绘图环境
var parameter; // 输出参数
var age = 0; // 迭代次数
var livesNumber = 0; // 生命数量
var livesCover = 0; // 覆盖率
window.onload = function () {
	parameter = document.getElementById("parameter");
	var canvas = document.getElementById("canvas");
	canvas.height = heightNumber * 4;
	canvas.width = widthNumber * 4;
	context = canvas.getContext("2d");
	setLifes();
	render(context);
	setInterval(function () {
		update();
		render(context);
	},
	100);
};

// 设置初始状态
function setLifes() {
	for (var j = 0; j < heightNumber; j++) {
		lifes[j] = new Array();
		for (var i = 0; i < widthNumber; i++) {
			var life = {
				isLive: false,
				nextLive: false,
				lived: false
			};
			lifes[j][i] = life;
		}
	}
	for (var i = 0; i < initialLife; i++) {
		var x = Math.floor(Math.random() * widthNumber);
		var y = Math.floor(Math.random() * heightNumber);
		while (lifes[y][x].isLive) {
			x = Math.floor(Math.random() * widthNumber);
			y = Math.floor(Math.random() * heightNumber);
		}
		var life = {
			isLive: true,
			nextLive: false,
			lived: true
		};
		lifes[y][x] = life;
	}
}

// 绘制
function render(context) {
	context.clearRect(0, 0, widthNumber * 4, heightNumber * 4);
	context.fillStyle = "#E8E8E8";
	context.fillRect(0, 0, widthNumber * 4, heightNumber * 4);
	for (var i = 0; i < widthNumber; i++) {
		for (var j = 0; j < heightNumber; j++) {
			if (lifes[j][i].isLive == true) {
				context.fillStyle = "#FF0000";
			}
			else if (lifes[j][i].lived == true) {
				context.fillStyle = "#00F5FF";
			}
			else {
				context.fillStyle = "#FFFFFF";
			}
			context.fillRect(i * 4, j * 4, 3, 3);
		}
	}
    parameter.innerHTML = "迭代次数:" + age + "  生命数量:" + livesNumber + "  生命覆盖率:" + livesCover + "%";
}

// 更新状态
function update() {
	var temp = 0;
	livesNumber = 0;
	for (var i = 0; i < widthNumber; i++) {
		for (var j = 0; j < heightNumber; j++) {
			checkNextLives(i, j);
		}
	}
	for (var i = 0; i < widthNumber; i++) {
		for (var j = 0; j < heightNumber; j++) {
			lifes[j][i].isLive = lifes[j][i].nextLive;
			if (lifes[j][i].isLive) {
				livesNumber++;
				lifes[j][i].lived = true;
			}
			if (lifes[j][i].lived)
				temp++;
		}
	}
	age++;
	livesCover = Math.floor(temp / heightNumber / widthNumber * 10000) / 100;
}

// 计算下一状态
function checkNextLives(i, j) {
	var count = 0;
	if (j > 0 && i > 0 && lifes[j - 1][i - 1].isLive)
		count++;
	if (j > 0 && lifes[j - 1][i].isLive)
		count++;
	if (j > 0 && i < (widthNumber - 1) && lifes[j - 1][i + 1].isLive)
		count++;
	if (i > 0 && lifes[j][i - 1].isLive)
		count++;
	if (i < (widthNumber - 1) && lifes[j][i + 1].isLive)
		count++;
	if (j < (heightNumber - 1) && i > 0 && lifes[j + 1][i - 1].isLive)
		count++;
	if (j < (heightNumber - 1) && lifes[j + 1][i].isLive)
		count++;
	if (j < (heightNumber - 1) && i < (widthNumber - 1) && lifes[j + 1][i + 1].isLive)
		count++;
	if (count == 2)
		lifes[j][i].nextLive = lifes[j][i].isLive;
	if (count == 3)
		lifes[j][i].nextLive = true;
	switch (count) {
		case 2:
		lifes[j][i].nextLive = lifes[j][i].isLive;
		break;
		case 3:
		lifes[j][i].nextLive = true;
		break;
		default:
		lifes[j][i].nextLive = false;
	}
}
