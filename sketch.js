let words = [];
let sentence = "";
let resultP;
let leftDiv;
let counter;
let cnv, myRec, btn, txt;
let hund, bil, gravsten, penge, pokkers;

function setup() {
    //Jeg skriver noget her

    hund = loadImage('img/hund_v2.png');
    bil = loadImage('img/roadkill_v2.jpg');
    gravsten = loadImage('img/gravsten_v2.jpg');
    penge = loadImage('img/penge_v2.jpg');
    pokkers = loadImage('img/pokkers.jpg');
    let SpeechRecognition = window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition ||
        window.oSpeechRecognition ||
        window.SpeechRecognition;
    cnv = createCanvas(1000, 600).position(width/6,0);
    background('green');
    txt = createElement("h5", "Say something..")
        .position(200, 200)
        .style("color:white;")
        .hide();

    resultP = createP("")
        .position(0, 50)
        .parent(txt);
    //Check browser comp
    if (SpeechRecognition !== undefined) {
        btn = createButton("Klik for at aktivere mikrofon")
            .position(500, 200)
            .style("font-size:1em;background-color:#33C3F0;border-color:#33C3F0;border-radius:8px;color:white;cursor:pointer;")
            .mousePressed(function () {
                btn.hide();
                txt.show();
                myRec = new p5.SpeechRec();
                myRec.continuous = true;
                myRec.interimResults = true;
                
                myRec.onResult = showResult;
                myRec.start();
            });
    }
}

function draw() {

}

function showResult() {
    if (myRec.resultValue == true) {
        sentence = myRec.resultString.split(' ').pop();
        resultP.html(sentence);

        if (sentence.includes("hund")) {
            image(hund, width/4, height / 2, hund.width / 2, hund.height / 2);
        }
        if(sentence.includes("kørt")) {
            image(bil, width/4, height / 2, bil.width / 2, bil.height / 2);
        }
        if(sentence.includes("gravsten")) {
            image(gravsten, width/4, height / 2, gravsten.width / 2, gravsten.height / 2);
        }
        if(sentence.includes("penge")) {
            image(penge, width/4, height / 2,);
        }
        if(sentence.includes("pokkers")) {
            image(pokkers, width/4, height / 2, pokkers.width / 2, pokkers.height / 2);
        }
        

    }
}