const fs = require('fs');
let memes = [];
for (let i = 1; i <= 5; i += 1) {
  memes = [...memes, ...require('./meme_url_' + i + '.json')];
}
let noIndexMemes = memes.map(({url, tags}) => ({url, tags}));

fs.writeFileSync('meme_url_tags.json', JSON.stringify(noIndexMemes));