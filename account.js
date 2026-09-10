const accountOpen=document.getElementById('accountOpen');
const accountOverlay=document.getElementById('accountOverlay');
const accountClose=document.getElementById('accountClose');
const accountForm=document.getElementById('accountForm');
const playerName=document.getElementById('playerName');
const playerStatus=document.getElementById('playerStatus');
const scoresOpen=document.getElementById('scoresOpen');
const scoresOverlay=document.getElementById('scoresOverlay');
const scoresClose=document.getElementById('scoresClose');
const scoresRows=document.getElementById('scoresRows');
const scoresStatus=document.getElementById('scoresStatus');
const scoreMode=document.getElementById('scoreMode');
const cloudSignIn=document.getElementById('cloudSignIn');
function loadPlayer(){try{return JSON.parse(localStorage.getItem('kebabRushPlayer')||'{}')}catch{return {}}}
function savePlayer(name){const player={name:name.trim()||'Guest',mode:'local'};localStorage.setItem('kebabRushPlayer',JSON.stringify(player));return player}
function syncAccount(){const p=loadPlayer();playerName.value=p.name||'';playerStatus.textContent=p.name?`Playing locally as ${p.name}`:'Guest mode · progress stays on this device';accountOpen.textContent=p.name?p.name:'Account'}
function localScores(){try{return JSON.parse(localStorage.getItem('kebabRushScores')||'[]')}catch{return []}}
function renderScores(){const rows=localScores().sort((a,b)=>b.takings-a.takings||b.served-a.served).slice(0,10);scoresRows.replaceChildren();rows.forEach((row,index)=>{const tr=document.createElement('tr');for(const value of [index+1,row.player,row.shop,`$${row.takings}`,row.served]){const td=document.createElement('td');td.textContent=value;tr.appendChild(td)}scoresRows.appendChild(tr)});scoresStatus.textContent=rows.length?'Best shifts saved on this device.':'No scores yet — finish a shift to post your first score.';scoreMode.textContent='LOCAL SCOREBOARD'}
accountOpen.onclick=()=>{syncAccount();accountOverlay.hidden=false;playerName.focus()};
accountClose.onclick=()=>{accountOverlay.hidden=true;accountOpen.focus()};
accountForm.onsubmit=e=>{e.preventDefault();const p=savePlayer(playerName.value);syncAccount();playerStatus.textContent=`Saved. You are playing locally as ${p.name}.`};
scoresOpen.onclick=()=>{renderScores();scoresOverlay.hidden=false;scoresClose.focus()};
scoresClose.onclick=()=>{scoresOverlay.hidden=true;scoresOpen.focus()};
window.addEventListener('kebab-rush-score',renderScores);
cloudSignIn.onclick=()=>{playerStatus.textContent='Cloud sign-in is not connected yet. The UI is ready; a secure backend is still required.'};
syncAccount();renderScores();