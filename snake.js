function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = SCALE * 1;
    this.ySpeed = SCALE * 1;
    this.score = 0;
    let trails = [];
    let trail;
    let crash = false;

    this.edgeControl = function() {
        if(this.x > GAMEBOARD_WIDTH - SCALE) this.x = 0;
        if(this.y > GAMEBOARD_HEIGHT - SCALE) this.y = 0;
        if(this.x < 0) this.x = GAMEBOARD_WIDTH - SCALE;
        if(this.y < 0) this.y = GAMEBOARD_HEIGHT - SCALE;
    }

    this.foodControl = function() {
        for(let i = 0; i < foodsInCurrentLevel.length; i++) {
            if(this.x === foodsInCurrentLevel[i].x && this.y === foodsInCurrentLevel[i].y) {
                foodsInCurrentLevel.splice(i, 1);
                this.score += 1;
            } else if(trails.length > this.score) {
                trails.shift();
            }
        }
    }

    this.crashControl = function() {
        if(trails.length > 0) {
            for(let i = 0; i < trails.length - 1; i++) {
                if(this.x === trails[i].x && this.y === trails[i].y) {
                    crash = true;
                }
            }
        }
    }
    
    this.draw = function() {
        CTX.fillStyle = '#ffffff';
        CTX.fillRect(this.x, this.y, SCALE, SCALE);
        this.drawTrails();
    }

    this.drawTrails = function() {
        for(let i = 0; i < trails.length; i++) {
            CTX.fillRect(trails[i].x, trails[i].y, SCALE, SCALE);
        }
    }

    this.update = function() {
        if(crash) {
            CTX.fillStyle = 'red';
            CTX.fillRect(this.x, this.y, SCALE, SCALE);
            this.drawTrails();
            return crash;
        }
        
        trail = new Trail(this.x, this.y);
        trails.push(trail);


        if("Right, Left, Up, Down".indexOf(direction) === -1) {
            direction = prevDirection;
        }

        switch(direction) {
            case "Right":
            this.x += this.xSpeed;
            prevDirection = direction;
            break;
            case "Left":
            this.x -= this.xSpeed;
            prevDirection = direction;
            break;
            case "Up":
            this.y -= this.ySpeed;
            prevDirection = direction;
            break;
            case "Down":
            this.y += this.ySpeed;
            prevDirection = direction;
            break;
        }

        this.crashControl();
        this.foodControl();
        this.edgeControl();
        this.draw();
    }
}