//An object-oriented rewrite of a simple canvas game


function Background() {
    this.ready = false;
    this.image = new Image()
    this.image.onload = function () {
        this.ready = true;
    };
    this.image.src = "images/flapBG.png";
};




function Hero(canvas) {
    this.ready = false;
    this.image = new Image();
    this.image.onload = function () {
        this.ready = true;
    };
    this.image.src = "images/hero.png";
    this.speed = 256;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
};




function Monster(canvas) {
    this.ready = false;
    this.image = new Image();
    this.image.onload = function () {
        this.ready = true;
    }
    this.image.src = "images/monster.png";
    this.x = 32 + (Math.random() * (canvas.width - 64));
    this.y = 32 + (Math.random() * (canvas.height - 64));
}





function Game() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 512;
    this.canvas.height = 480;
    document.body.appendChild(this.canvas);

    this.hero = new Hero(this.canvas);
    this.monster = new Monster(this.canvas);
    this.monstersCaught = 0;

    this.keysDown = {};
    this.now = Date.now();
    this.then = Date.now();
    this.delta = this.now - this.then;



    this.addListeners = function() {
        addEventListener("keydown", function(e) {
            this.keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", function(e) {
            delete this.keysDown[e.keyCode];
        }, false);
    }();




    this.checkInput = function(modifier) {
        if (38 in this.keysDown) {
            this.hero.y -= this.hero.speed * modifier;
        }
        if (40 in this.keysDown) {
            this.hero.y += this.hero.speed * modifier;
        }
        if (37 in keysDown) {
            this.hero.x -= this.hero.speed * modifier;
        }
        if (39 in keysDown) {
            this.hero.x += this.hero.speed * modifier;
        }
    };



    this.checkCollisions = function() {
        if (
            this.hero.x <= (this.monster.x + 32)
            && this.monster.x <= (this.hero.x + 32)
            && this.hero.y <= (this.monster.y + 32)
            && this.monster.y <= (this.hero.y + 32)
    ) {
        monstersCaught++;
        this.monster = new Monster(this.canvas)
    }
    };



    this.update = function(modifier) {
        this.checkInput(modifier);
        this.checkCollision();
    };



    this.render = function() {
        if (this.background.ready) {
            this.ctx.drawImage(this.background.image, 0, 0);
        }

        if (this.hero.ready) {
            this.ctx.drawImage(this.hero.image, this.hero.x, this.hero.y);
        }

        if (this.monster.ready) {
            this.ctx.drawImage(this.monster.image, this.monster.x, this.monster.y);
        }

        this.ctx.fillStyle = "rgb(250, 250, 250)";
        this.ctx.font = "24px Helvetica";
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.fillText("Goblins caught: " + this.monstersCaught, 32, 32);
    };


    this.main = function() {
        this.now = Date.now();
        this.delta = this.now - this.then;
        this.update(this.delta/1000);
        this.render();
        this.then = this.now;
    }

};




var control = new Game();


// Let's play this game!
setInterval(control.main, 1); // Execute as fast as possible





