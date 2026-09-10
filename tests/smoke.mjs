import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('style.css','utf8');
const game=fs.readFileSync('game.js','utf8');

for(const id of ['start','customers','menu','tray','golden','pour','customOverlay','customForm','upgradesOverlay','upgradeList','operatorAvatar','shopName']){
  assert.match(html,new RegExp(`id=["']${id}["']`),`Missing required UI element #${id}`);
}

for(const hook of ['Golden HSP','kebabRushState','renderUpgrades','applyProfile','startGolden','prepTime','tickPrep','queue:[]']){
  assert.ok(game.includes(hook),`Missing gameplay hook: ${hook}`);
}

for(const visual of ['rotisserie-station','operator-avatar','dining-area','hsp-box','upgrade-card']){
  assert.ok(css.includes(`.${visual}`),`Missing visual style: .${visual}`);
}

new Function(game);
console.log('Kebab Rush smoke test passed.');
