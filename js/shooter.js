const Bullet = function(x, y, d, vx) {

    this.x = x;
    this.y = y; 
    this.d = d; 
    this.vx = 5 * d + vx;

};

Bullet.prototype = {

    updatePosition:function() {

        this.x += this.vx;

    }

};

const Player = function(x, y, d) {

    this.x = x; 
    this.y = y; 
    
    this.d = d;
    this.source_x = 64;
    this.jumping = true;
    
    this.vx = 0; 
    this.vy = 0;

};

Player.prototype = {

    jump:function() {

        if (!this.jumping) {

            this.jumping = true;
            this.vy = -20;

        }

    },

    updatePosition:function(x, y) {

        this.vx = (x - this.x) * 0.01;

        this.x += this.vx;
        this.y += this.vy;

        if (this.vx < 0) { this.d = -1; this.source_x = 64; }
        else { this.d = 1; this.source_x = 80; }

        this.vx *= 0.9;
        this.vy *= 0.9;

    }

};

var tile_sheet = new Image();

var columns = 16; var rows = 16; var tile_size = 16; var scale = 1;
var map =         [1,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1,
                   0,1,0,0,0,1,0,0,1,1,0,1,0,1,1,0,
                   0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,
                   1,0,1,0,0,0,0,1,1,0,1,0,0,0,0,0,
                   0,0,1,1,1,0,0,1,0,0,1,0,0,1,0,0,
                   1,1,1,0,1,0,0,0,0,0,0,1,1,0,0,0,
                   1,0,0,1,0,0,1,1,0,0,0,0,1,1,0,1,
                   0,1,1,0,0,0,1,0,0,0,0,0,1,1,0,0,
                   0,0,0,1,1,0,0,0,0,0,1,0,1,0,1,0,
                   1,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,
                   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                   2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
                   3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
                   3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
                   3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
                   3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];

var context = document.querySelector("canvas").getContext("2d");
var buffer  = document.createElement("canvas").getContext("2d");
tile_sheet.src = "/img/shoot.png";

var height = document.documentElement.clientHeight - 16;
var width  = document.documentElement.clientWidth  - 16;

var pointer = { down:false, x:0, y:0 }

var player = new Player (100, 100, -1);

var bullets = new Array();


// Game loop
function loop() {

    // Function calls itself
    window.requestAnimationFrame(loop);

    height = document.documentElement.clientHeight - 16;
    width  = document.documentElement.clientWidth - 16;

    var min_size = height < width ? height : width;

    context.canvas.height = min_size;
    context.canvas.width  = min_size;
    // Added this after the video was made
    context.imageSmoothingEnabled = false;

    scale = min_size / buffer.canvas.width;

    // Drawing the image
    for (let index = map.length - 1; index > -1; -- index) {

        let value = map[index];
        let tile_x = (index % columns) * tile_size;
        let tile_y = Math.floor(index / columns) * tile_size;

        buffer.drawImage(tile_sheet, value * tile_size, 0, tile_size, tile_size, tile_x, tile_y, tile_size, tile_size);

    }

    if (pointer.down) {

        pointer.down = false;
        if (pointer.y < player.y)	player.jump();

        bullets.push(new Bullet(player.x + tile_size * 0.5 - 2 + player.d * 4, player.y + 8, player.d, player.vx));

    }

    player.vy += 1;
    player.updatePosition(pointer.x, pointer.y);

    if (player.y + tile_size > tile_size * 11 + 4) { player.y = tile_size * 10 + 4; player.jumping = false; player.vy = 0; }

    buffer.drawImage(tile_sheet, player.source_x, 0, tile_size, tile_size, player.x, player.y, tile_size, tile_size);

    for (let index = bullets.length - 1; index > -1; -- index) {

        let bullet = bullets[index];

        bullet.updatePosition();

        buffer.fillStyle = "#000000";
        buffer.fillRect(bullet.x, bullet.y, 1.5, 1.5);

        if (bullet.x < -4 || bullet.x > buffer.canvas.width) bullets.splice(index, 1);

    }

    context.drawImage(buffer.canvas, 0, 0, buffer.canvas.width, buffer.canvas.height, 0, 0, context.canvas.width, context.canvas.height);

}

buffer.canvas.height = tile_size * rows;
buffer.canvas.width  = tile_size * columns;
buffer.imageSmoothingEnabled = false;

tile_sheet.addEventListener("load", (event) => { 
    loop();
});

context.canvas.addEventListener("click", (event) => {

    var boundary = event.target.getBoundingClientRect();

    pointer.x = (event.pageX - boundary.left) / scale;
    pointer.y = (event.pageY - boundary.top) / scale;

    pointer.down = true;

});

var activeKey = 0;

document.addEventListener('keydown', function(e) {
    var boundary = event.target.getBoundingClientRect();

    if (activeKey == e.keyCode) return;
    activeKey = e.keyCode;
    //left
    if (e.keyCode == 37) {
        console.log('start moving LEFT');
        pointer.x = (event.pageX - boundary.left) / scale;
        pointer.y = (event.pageY - boundary.top) / scale;
    }
    //right
    else if (e.keyCode == 39) {
        console.log('start moving RIGHT');
        pointer.x = (event.pageX - boundary.left) / scale;
        pointer.y = (event.pageY - boundary.top) / scale;
    }
});