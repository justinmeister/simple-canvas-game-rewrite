//An object-oriented rewrite of a simple canvas game


function Background() {
    var that = this;
    this.ready = false;
    this.image = new Image()
    this.image.onload = function () {
        that.ready = true;
    };
    this.image.src = "images/background.png";
};




function Hero(canvas) {
    var that = this;
    this.ready = false;
    this.image = new Image();
    this.image.onload = function () {
        that.ready = true;
    };
    this.image.src = "images/hero.png";
    this.speed = 256;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
};




function Monster(canvas) {
    var that = this;
    this.ready = false;
    this.image = new Image();
    this.image.onload = function () {
        that.ready = true;
    }
    this.image.src = "images/monster.png";
    this.x = 32 + (Math.random() * (canvas.width - 64));
    this.y = 32 + (Math.random() * (canvas.height - 64));
}





function Game() {
    var that = this
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 512;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.hero = new Hero(this.canvas);
    this.monster = new Monster(this.canvas);
    this.monstersCaught = 0;

    this.background = new Background()

    this.keysDown = {};
    this.now = Date.now();
    this.then = Date.now();
    this.delta = this.now - this.then;



    this.addListeners = function() {
        addEventListener("keydown", function(e) {
            that.keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", function(e) {
            delete that.keysDown[e.keyCode];
        }, false);
    }();




    this.checkInput = function(modifier) {
        if (38 in that.keysDown) {
            that.hero.y -= that.hero.speed * modifier;
        }
        if (40 in that.keysDown) {
            that.hero.y += that.hero.speed * modifier;
        }
        if (37 in that.keysDown) {
            that.hero.x -= that.hero.speed * modifier;
        }
        if (39 in that.keysDown) {
            that.hero.x += that.hero.speed * modifier;
        }
    };



    this.checkCollisions = function() {
        if (
            that.hero.x <= (that.monster.x + 32)
            && that.monster.x <= (that.hero.x + 32)
            && that.hero.y <= (that.monster.y + 32)
            && that.monster.y <= (that.hero.y + 32)
    ) {
        that.monstersCaught++;
        that.monster = new Monster(that.canvas)
    }
    };



    this.update = function(modifier) {
        that.checkInput(modifier);
        that.checkCollisions();
    };



    this.render = function() {
        if (that.background.ready) {
            that.ctx.drawImage(that.background.image, 0, 0);
        }

        if (that.hero.ready) {
            that.ctx.drawImage(that.hero.image, that.hero.x, that.hero.y);
        }

        if (that.monster.ready) {
            that.ctx.drawImage(that.monster.image, that.monster.x, that.monster.y);
        }

        that.ctx.fillStyle = "rgb(250, 250, 250)";
        that.ctx.font = "24px Helvetica";
        that.ctx.textAlign = "left";
        that.ctx.textBaseline = "top";
        that.ctx.fillText("Goblins caught: " + that.monstersCaught, 32, 32);
    };


    this.main = function() {
        that.now = Date.now();
        that.delta = that.now - that.then;
        that.update(that.delta/1000);
        that.render();
        that.then = that.now;
    }

};




var control = new Game();

// Let's play this game!
setInterval(control.main, 1); // Execute as fast as possible





