import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('style.css','utf8');
const enhancements=fs.readFileSync('enhancements.css','utf8');
const game=fs.readFileSync('game.js','utf8');
const account=fs.readFileSync('account.js','utf8');

for(const id of ['start','customers','menu','tray','golden','pour','customOverlay','customForm','upgradesOverlay','upgradeList','operatorAvatar','shopName','accountOpen','scoresOpen','accountOverlay','scoresOverlay','scoresRows','playerName']){
  assert.match(html,new RegExp(`id=["']${id}["']`),`Missing required UI element #${id}`);
}

for(const hook of ['Golden HSP','kebabRushState','renderUpgrades','applyProfile','startGolden','prepTime','tickPrep','queue:[]','renderOrder','recordScore','kebabRushScores']){
  assert.ok(game.includes(hook),`Missing gameplay hook: ${hook}`);
}

for(const hook of ['kebabRushPlayer','renderScores','LOCAL SCOREBOARD','cloudSignIn']){
  assert.ok(account.includes(hook),`Missing account/score hook: ${hook}`);
}

for(const visual of ['rotisserie-station','operator-avatar','dining-area','hsp-box','upgrade-card']){
  assert.ok(css.includes(`.${visual}`),`Missing visual style: .${visual}`);
}

for(const visual of ['order-ticket','order-item','customer-portrait','menu-art','scores-table','account-hero']){
  assert.ok(enhancements.includes(`.${visual}`),`Missing enhancement style: .${visual}`);
}

for(const asset of ['food/kebab.svg','food/hsp.svg','food/chips.svg','food/falafel.svg','food/golden-hsp.svg','customer/tradie.svg','customer/student.svg','customer/office.svg','customer/footy.svg']){
  assert.ok(fs.existsSync(`public/${asset}`),`Missing art asset: public/${asset}`);
}

new Function(game);
new Function(account);
console.log('Kebab Rush smoke test passed.');
