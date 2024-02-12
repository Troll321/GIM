const scoreE = document.getElementById("score");
const timeE = document.getElementById("time");
const gameAreaE = document.getElementById("gameArea");
const gameAreaS = getComputedStyle(gameAreaE);
const start = document.getElementById("start");

start.addEventListener("click", function(){init(); this.remove();});

let score = 0, timestart = 0, time = 0, freq = 0, isPlaying = false;

function init() {
    score = 0, time = 0, freq = 0;
    isPlaying = true;
    timestart = Date.now();
    gameAreaE.innerHTML = "";
    
    summon();
    loop();
}

function loop() {
    if(!isPlaying) {return ;}
    time++;
    timeE.innerText = Math.floor((Date.now()-timestart)/1000);

    if(time >= freq) {summon();}

    window.requestAnimationFrame(loop);
}

function summon() {
    freq = Math.max(MIN_FREQ, FREQ_INIT-Math.floor((Date.now()-timestart)*FREQ_RATE));
    time = 0;

    const size = rand(MIN_SIZE, MAX_SIZE);
    const pos = {x: rand(2*size, parseInt(gameAreaS.width)-2*size), y: rand(2*size, parseInt(gameAreaS.height)-2*size)};
    const div = document.createElement("div");
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.classList.add("buletan");
    const tid = setTimeout(() => {
        gameOver();
    }, DIE_TIME);
    div.addEventListener("click", () => {clickHandler(div, tid)});
    gameAreaE.appendChild(div);
}

function clickHandler(div, tid) {
    clearTimeout(tid);
    div.remove();
    score++;
    scoreE.innerText = score;
}

function gameOver() {
    if(!isPlaying) {return ;}
    isPlaying = false;
    alert("Congratzz your score is " + scoreE.innerText);
    window.location.reload();
}

function rand(min, max) {
    return Math.floor((Math.random() * (max-min+1)) + min);
}