const csv = require('csvtojson');
const clari = require('../src/database/clarifai');
const csvFilePath = './meme_url.csv';
const fs = require('fs');

let answer = [];
let a = 40;
csv()
  .fromFile(csvFilePath)
  .then(memes => {
    memes = memes.slice(a, a + 10);
    Promise.all(
      memes.map((meme, idx) => {
        return clari.getTagsFromUrl(meme.url)
          .then(tags => {
            answer[idx] = {idx, url: meme.url, tags: tags};
          })
          .catch(err => console.log(err));
      }))
      .then(result => {
        fs.writeFileSync('meme_url_5.json', JSON.stringify(answer))
      });
  });