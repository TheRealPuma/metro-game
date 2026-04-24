let config;
let state = { money: 100, trains: 1 };
let admin = false;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// LOAD CONFIG
fetch("./config.json")
  .then(r => r.json())
  .then(data => {
    config = data;
    loop();
  });

// DRAW MAP STYLE
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(!config) return;

  // LINES
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 3;
  ctx.beginPath();
  config.stations.forEach((s,i) => {
    if(i === 0) ctx.moveTo(s.x,s.y);
    else ctx.lineTo(s.x,s.y);
  });
  ctx.stroke();

  // STATIONS
  config.stations.forEach(s => {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x,s.y,6,0,Math.PI*2);
    ctx.fill();
  });

  // SIMPLE TRAINS
  ctx.fillStyle = "yellow";
  for(let i=0;i<state.trains;i++){
    let t = (Date.now()/1000 + i) % config.stations.length;
    let a = config.stations[Math.floor(t)];
    ctx.beginPath();
    ctx.arc(a.x,a.y,4,0,Math.PI*2);
    ctx.fill();
  }

  document.getElementById("money").innerText = "Money: " + state.money;
  document.getElementById("trains").innerText = "Trains: " + state.trains;
}

function loop(){
  draw();
  requestAnimationFrame(loop);
}

// ADMIN
document.getElementById("adminBtn").onclick = () => {
  if(admin){
    toggle();
    return;
  }

  let pw = prompt("Password?");
  if(pw === config.adminPassword){
    admin = true;
    toggle();
  } else alert("Wrong");
};

function toggle(){
  let p = document.getElementById("panel");
  p.style.display = p.style.display === "block" ? "none" : "block";
}

// BUTTONS
document.getElementById("moneyBtn").onclick = () => state.money += 100;
document.getElementById("trainBtn").onclick = () => state.trains++;
