function GameOfLiveCanvas(canvasId, cols, rows, options) {
	function mergeOptions(obj1, obj2) {
		var obj3 = {};
		for ( var attrname in obj1) {
			obj3[attrname] = obj1[attrname];
		}
		for ( var attrname in obj2) {
			obj3[attrname] = obj2[attrname];
		}
		return obj3;
	}
	var canvasId = canvasId;
	var defaultOptions = {
		'size' : 5,
		'colorDead' : '#dddddd',
		'colorAlive' : '#000000',
		'figure' : 'rect'
	}

	var options = mergeOptions(defaultOptions, options);

	var canvas = document.getElementById(canvasId);
	canvas.width = cols * (options.size + 1);
	canvas.height = rows * (options.size + 1);

	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var ctx = canvas.getContext("2d");
	var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

	// Private
	drawPoint = function(x, y, color) {
		if (x == 0) {
			dx = 0;
		} else {
			dx = x * options.size + x;
		}

		if (y == 0) {
			dy = 0;
		} else {
			dy = y * options.size + y;
		}

		ctx.beginPath();
		
		if(options.figure == "arc") {
			ctx.arc(dx + options.size/2, dy + options.size/2, options.size/2, 0, 2 * Math.PI);
		} else {
			ctx.rect(dx, dy, options.size, options.size);
		}
		ctx.fillStyle = color;
		ctx.fill();
	}

	// Public
	this.alive = function(x, y) {
		drawPoint(x, y, options.colorAlive)
	}
	// Public
	this.dead = function(x, y) {
		drawPoint(x, y, options.colorDead)
	}
	// Public
	this.clear = function() {
		for (x = 0; x <= cols; x++) {
			for (y = 0; y <= rows; y++) {
				this.dead(x, y);
			}
		}
	}

	this.clear();
}