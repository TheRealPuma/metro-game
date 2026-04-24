let config;
let state;
let adminUnlocked = false;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// LOAD CONFIG JSON
fetch('config.json')
  .then(res => res.json())
  .then(data => {
    config = data;
    state = {
      money: config.startMoney,
      trains: 1
    };
    gameLoop();
  });

// DRAW
function draw() {
  ctx.clearRect(0,0,600,400);

  ctx.fillStyle = "black";
  config.stations.forEach(s => {
    ctx.fillRect(s.x-5,s.y-5,10,10);
  });

  ctx.fillStyle = "red";
  for(let i=0;i<state.trains;i++){
    let t = (Date.now()/1000 + i) % 1;
    let x = 100 + t * 400;
    let y = 200 - t * 100;
    ctx.beginPath();
    ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fill();
  }

  ctx.fillStyle = "black";
  ctx.fillText("Money: " + state.money, 10, 20);
  ctx.fillText("Trains: " + state.trains, 10, 40);
}

function gameLoop(){
  draw();
  requestAnimationFrame(gameLoop);
}

// ADMIN LOGIC
document.getElementById("adminBtn").addEventListener("click", () => {
  if(adminUnlocked){
    toggleAdmin();
    return;
  }

  const input = prompt("Enter Admin Password:");
  if(input === config.adminPassword){
    adminUnlocked = true;
    alert("Access granted");
    toggleAdmin();
  } else {
    alert("Wrong password");
  }
});

function toggleAdmin(){
  const panel = document.getElementById('admin');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// BUTTON EVENTS

document.getElementById("moneyBtn").addEventListener("click", () => {
  state.money += 100;
});

document.getElementById("trainBtn").addEventListener("click", () => {
  state.trains += 1;
});
