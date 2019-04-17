
// Objekte

var right;
var left;
var body;
var drop;

// Sounds

var dropsound;
var dropsound2;
var metro;

// Score

var highscore = 0;
var score = 0;

// Einstellungen

var sli;
var speed =6;

var sel;
var random;
var modus = 1;
var side = -1;

var counter = 1;

// Hilfe

var hlp;
var expl;

// Canvas

var canv;
var canvasw = 500;
var canvash = 600;

document.body.style.backgroundColor = "rgb(20,20,20)";



// Preload

function preload() {

    dropsound = loadSound("sounds/metro1.wav");
    dropsound2 = loadSound("sounds/metro2.wav");
    metro = loadSound("sounds/metro3.wav");
}

function setup() {

    canv = createCanvas(canvasw,canvash);
    canv.style("display","block");
    canv.style("margin","0 auto");
    canv.style("marginTop","100px");
    canv.style("border","8px solid rgb(10,10,10)");

    createP("");
    

    right = new rightarm();
    left = new leftarm();
    body = new body();
    drop = new drop();

    sli = createSlider(0,4,2);
    sli.style("display","block");
    sli.style("margin","0 auto");

    createP("");

    sel = createSelect();
    sel.style("display","block");
    sel.style("margin","0 auto");
    sel.option("2/4 Takt");
    sel.option("4/4 Takt");
    sel.option("Chaos");
    sel.changed(modusUpdate);

    hlp = createElement("h1","?");
    hlp.position(20,0); 
    hlp.style("color","rgb(150,150,150)");
    hlp.style("font-weight","bold");

    expl = createP("Fange die Wassertropfen mithilfe der Tasten A und D. Viel Spaß!");
    expl.position(50,15);
    expl.style("color","rgb(20,20,20)");
    expl.style("font-family","Arial");
    expl.style("font-style","italic");
    expl.style("font-weight","bold");
}



// Buttons

function reset() {

    highscore = 0;
    sli.value(2);
    speed = 6;
}

function modusUpdate() {

    if (sel.value() == "2/4 Takt") {
        modus = 1;
        counter = 1;
    }
    else if (sel.value() == "4/4 Takt") {
        modus = 2;
        counter = 1;
    }
    else if (sel.value() == "Chaos") {
        modus = 3;
    }
}

function modusCheck() {

    // Takt durchzählen

counter++;

random = Math.round(Math.random((0,1)));

if ((counter == 3 && modus == 1) || (counter == 5 && modus == 2)) { 
    counter = 1;

}

    // Seite bestimmen

if ((modus == 1 || modus == 2) && counter == 1) {
    side = -1;
}
else if ((modus == 1 || modus == 2) && counter > 1) {
    side = 1;
}
else if (modus == 3 && random == 0) {
    side = -1;   
}
else if (modus == 3 && random == 1) {
    side = 1;
}


}


// Draw 

function draw() {

    background(255,235,150);

    right.update();
    right.show();
    left.update();
    left.show();
    body.update();
    body.show();
    drop.update();
    drop.show();

    textSize(20);
    strokeWeight(3);
    stroke(180);
    fill(255);
    text("Punkte\t" + score, 20, 35);

    if (score > highscore) {
        highscore = score
    }

    textSize(20);
    strokeWeight(3);
    stroke(180,180,0);
    fill(255,255,0);
    text("Rekord\t" + highscore, 20, 60);

    if (mouseY <= 20 && mouseX <= 20)  {
        expl.style("color","rgb(150,150,150");
    }
    else {
        expl.style("color","rgb(20,20,20");
    }
}


// Arms 

function leftarm() {

    this.h = 530;
    this.startl = -100;
    this.l = this.startl;
    this.handx = canvasw/2 + this.l;
    this.handy = this.h-30;

    this.update = function() {

        this.handx = canvasw/2 + this.l;
        this.handy = this.h-30;

        if (this.handx < canvasw/2 + this.startl) {
            this.l = this.l +4;
        }
    }

    this.show = function() {

        noFill();
        strokeWeight(6);
        stroke(0,51,0);
        curve(canvasw,canvash/2,body.bodyx,this.h,this.handx,this.handy,canvasw/2 + this.l,canvash/3);

        fill(0,128,255);
        strokeWeight(0);
        rect(this.handx-10,this.handy-20,20,20);

        fill(255,0,0,0);
        stroke(50);
        strokeWeight(4);
        rect(this.handx-10,this.handy-30,20,30);

    }
}

function rightarm() {

    this.h = 530;
    this.startl = 100;
    this.l = this.startl;
    this.handx = canvasw/2 + this.l;
    this.handy = this.h-30;

    this.update = function() {

        this.handx = canvasw/2 + this.l;
        this.handy = this.h-30;

        if (this.handx > canvasw/2 + this.startl) {
            this.l = this.l -4;
        }
    }

    this.show = function() {

        noFill();
        strokeWeight(6);
        stroke(0,51,0);
        curve(0,canvash/2,body.bodyx,this.h,this.handx,this.handy,canvasw/2 + this.l,canvash/3);
        
        fill(0,128,255);
        strokeWeight(0);
        rect(this.handx-10,this.handy-20,20,20);

        fill(255,0,0,0);
        stroke(50);
        strokeWeight(4);
        rect(this.handx-10,this.handy-30,20,30);
    }
}



// Body

function body() {

    this.l = 0;
    this.headstartx = canvasw/2;
    this.headx = this.headstartx + this.l;
    this.heady = 505;
    this.bodystartx = canvasw/2;
    this.bodyx = this.bodystartx + this.l;
    this.bodyy = 590;

    this.update = function() {

        this.headx = this.headx + this.l *1.2;
        this.bodyx = this.bodyx + this.l;

        if (this.headx > this.headstartx) {
            this.headx = this.headx -1;
            this.l = 0;
        }

        if (this.headx < this.headstartx) {
            this.headx = this.headx +1;
            this.l = 0;
        }

        if (this.bodyx > this.bodystartx) {
            this.bodyx = this.bodyx -1;
            this.l = 0;
        }

        if (this.bodyx < this.bodystartx) {
            this.bodyx = this.bodyx +1;
            this.l = 0;
        }


        
    }

    this.show = function() {

    fill(0,100,0);
    stroke(0,51,0);
    ellipse(this.headx, this.heady,50,50);
    ellipse(this.bodyx,this.bodyy,60,120);
    fill(255);
    ellipse(this.headx-15, this.heady -15,20,20);
    ellipse(this.headx+15, this.heady -15,20,20);
    fill(0);
    strokeWeight(0);
    ellipse(this.headx - 15 + (((this.headx/this.headstartx) -1) *50), this.heady -15,8,8);
    ellipse(this.headx + 15 + (((this.headx/this.headstartx) -1) *50), this.heady -15,8,8);



    }
}


// Controls 

function keyPressed() {

    if (keyCode == 65 && left.l == left.startl && right.l == right.startl ) {
        left.l = left.l *1.8;
        body.l = -20;
    }

    if (keyCode == 68 && left.l == left.startl && right.l == right.startl) {
        right.l = right.l *1.8;
        body.l = 20;
    }

    


}

// Drop

function drop() {

    this.grav = 0.3;
    this.speed = speed;
    this.side = 1;
    this.x = canvasw/2 + 170*this.side;
    this.y = -10;

    this.transp = 255;

    this.update = function() {

        if (sli.value() == 0) {
            speed = 4;
        }
        else if (sli.value() == 1) {
            speed = 6;
        }
        else if (sli.value() == 2) {
            speed = 9;
        }
        else if (sli.value() == 3) {
            speed = 12;
        }
        else if (sli.value() == 4) {
            speed = 16;
        }
        else {
            speed = 6;
        }

        this.y = this.y + this.speed;
        this.speed = this.speed + this.grav;
        this.x = canvasw/2 + 170*this.side;

        if (this.y >= canvash) {
            
            if(this.transp == 255) {
                score = 0;
            }

            this.speed = speed;
            modusCheck();
            this.side = side;
            this.transp = 255;
            this.y = -10;
        }

        if (this.y >= left.handy-20 && this.y <= left.handy-15 &&  this.x >= left.handx -10 && this.x <= left.handx+10) {
            
            this.transp= 0;
            score += 1;
            dropsound.play();

        }

        if (this.y >= right.handy-20 && this.y <= right.handy-15 && this.x >= right.handx -10 && this.x <= right.handx+10) {
            
            this.transp= 0;
            score += 1;
            dropsound2.play();

        }

        if (this.y >= left.handy-20 && this.y <= left.handy-15) {
            metro.play();

        }
    }

    this.show = function() {

        fill(0,128,255,this.transp);
        stroke(0,0,255);
        ellipse(this.x,this.y,10,10);
    }
}