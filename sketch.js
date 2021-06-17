var bounceCount, bounceRecord;
var numCtrl, mouseCtrl;

function setup() {
  //createCanvas(400,600);
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  numCtrl = false;
  mouseCtrl = true;
  bounceCount = 0;
  bounceRecord = 0;
  ball = new Ball();
  paddle = new Paddle();
}

function draw() {
  background(0);
  textSize(60);
  fill(255, 50);
  textAlign(CENTER);
  text('Score: ' + bounceCount, width / 2, 100);
  text('Record: ' + bounceRecord, width / 2, 200);
  ball.show();
  ball.update();
  paddle.show();
  paddle.update();
}

function mouseControl() {
  mouseCtrl = true;
  numCtrl = false;
}

function numControl() {
  mouseCtrl = false;
  numCtrl = true;
}

function Paddle() {
  this.x = width / 2;
  this.y = height - 20;
  this.speed = 0;
  this.acc = 0;
  this.w = 100;
  this.h = 10;

  this.show = function() {
    rect(this.x, this.y, this.w, this.h);
  }

  this.update = function() {
    if (mouseCtrl) {
      this.x = mouseX;
    }
    if (numCtrl) {
      this.x += this.speed;
    }

    if (this.x > width - this.w / 2) this.x = width - this.w / 2;
    if (this.x < this.w / 2) this.x = this.w / 2;

  }

}

function Ball() {
  this.pos = createVector(width / 2 + random(-45, 45), 10);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0.2);
  this.r = 10;

  this.show = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    if (this.pos.x < this.r || this.pos.x > width - this.r) {
      this.vel.x *= -1;
    }

    if (this.pos.y > paddle.y - this.r &&
      this.pos.x > paddle.x - paddle.w / 2 && this.pos.x < paddle.x + paddle.w / 2) {
      this.pos.y -= 1;
      this.vel.y *= -1.01;
      bounceCount++;
      if (bounceRecord < bounceCount) bounceRecord = bounceCount;
      this.vel.x -= (paddle.x - this.pos.x) / 15;
      //this.acc.y *= 1.01;
      if(bounceCount % 10 == 0 && bounceCount!=0 && paddle.w > 15) {
       paddle.w -= 10; 
      }
    }

    if (this.pos.y > height) {
      bounceCount = 0;
      this.pos = createVector(width / 2 - random(-45, 45), 10);
      this.vel.x = 0;
      this.vel.y = 0;
    }
  }
}

function keyPressed() {
  if (numCtrl) {
    if (keyCode === LEFT_ARROW) {
      paddle.speed = -6;
      print('eas');
    }
    if (keyCode === RIGHT_ARROW) {
      paddle.speed = 6;
    }
  }
}

function keyReleased() {
  if (numCtrl) {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      paddle.speed = 0;
    }
  }
}