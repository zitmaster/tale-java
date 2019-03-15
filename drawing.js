//Make a small drawing program with p5 speech 
//reference: http://ability.nyu.edu/p5.js-speech/
//Cloned from github.com/simmoe/api_p5_speech

let myRec, browserCompatible, pen, direction, displayWord, timer;
let houseDrawing = false;


function setup() {
    cnv = createCanvas(400, 400);
    background('black');
    //Check browser compatibility
    browserCompatible = window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition ||
        window.oSpeechRecognition ||
        window.SpeechRecognition;
    //If compatible browser - instantiate 
    if (browserCompatible !== undefined) {
        myRec = new p5.SpeechRec();
        myRec.continuous = true;
        myRec.interimResults = true;
        myRec.onResult = showResult;
        myRec.start();
    }    
    displayWord = createDiv();

    pen = {
        x: width/2,
        y: height/2,
        size: 10,
        col: color(255,255,255,150),
        show: function(){
            ellipseMode(CENTER),
            noStroke(),
            fill(this.col),
            ellipse(this.x ,this.y ,this.size,this.size)
        },
        bounce: function(){
            this.x = this.x < 0 ? 0 : this.x > width ? width : this.x;
            this.y = this.y < 0 ? 0 : this.y > height ? height : this.y;
        }
    }
    console.log("Pen findes, og dens x værdi er: " + pen.x);
}

function draw() {
    if(direction == "left") pen.x -= 1;
    if(direction == "right") pen.x += 1;
    if(direction == "down") pen.y += 1;
    if(direction == "up") pen.y -= 1;
    if (direction == "firkant"){
      if(!houseDrawing){
        houseDrawing = true;
        timer = millis();
      }
      let time = millis() - timer;

      if(time < 1000){
        pen.x--;
        pen.col = color(255,0,255,150);
      }
      if (time > 1000 && time < 1500){
        pen.y--;
        pen.col = color(0,255,0,150);
      }
      if(time > 1500 && time < 2000){
        pen.x++;
        pen.y--;
        pen.col = color(0,0,255,150);
      }
      if(time > 2000 && time < 2500){
        pen.y++;
        pen.x++;
      }
      if(time > 2500 && time < 3000){
        pen.y++;
        pen.col = color(0,255,0,150);
      }
    }
    pen.show();
    pen.bounce();
}

function showResult() {
    if (myRec.resultValue == true) {
        word = myRec.resultString.split(' ').pop();
        displayWord.html(word.toLowerCase());
        switch(word) {
            case 'left':
            direction = "left"
              break;

            case 'right':
            case 'ride':
            direction = "right"
              break;

              case 'down':
              case 'downtawn':
            direction = "down"
              break;

              case 'up':
              case 'pop':
              case 'hop':
              case 'top':
            direction = "up"
              break;

            default:
              direction = "stop"

            case 'big':
            pen.size += 10;
            
            case 'small':
            pen.size -= 10;

            case 'firkant':
            direction = "firkant"
          }
    }
}

/*
OPGAVER 

Vi skal forsøge at lave et lille tegneprogram, som bruger stemmegenkendelse til at føre pennen rundt på skærmen. 

Det første vi gør er at lave et objekt, pen, med Javascript Object notation. Objektet skal have følgende properties og metoder:

x, y, size, col
show() - metode som laver fill(this.col), og viser en ellipse(this.x, this.y, this.size, this.size)

Se hvordan her: https://www.w3schools.com/jS/js_objects.asp

Objektet skal laves i setup() - og metoden pen.show() skal kaldes i draw() 

Nu skal vi så bruge variablen word til at flytte rundt på objektet. Til det skal vi bruge et såkaldt switch statement i draw. 

Læs dokumentationen her - og se om du kan sørge for at ordene 'left', 'right', 'up', 'down' flytter vores pen rundt
https://www.w3schools.com/js/js_switch.asp

Se så om du kan tilføje endnu en metode i objektet - bounce - som sørger for at pennen ikke kommer længere, 
når x er mindre end nul eller større end bredden. Og tilsvarende for y.

Bemærk at der findes en smart måde at skrive comditions på, således:

a = a < 0 ? 0 : a;

Som betyder - sæt a til (er a mindre end nul?) 0, ellers a

_ _ _ _ _ _ _ _

Se om du kan lave programmet så man kan skifte farver - ved for eksempel at sige green, red, blue

Se om du kan lave programmet så man kan skifte størrelse ved at sige bigger, smaller

*/