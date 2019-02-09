const clarifai = require('./clarifai');

clarifai.getTagsFromUrl('https://imgflip.com/s/meme/Surprised-Pikachu.jpg').then(
  value => {
    console.log(value);
  }
);

const TEST_PAIRS = [
  { id: 1, tags: ['a', 'b', 'c'] },
  { id: 2, tags: ['c', 'd', 'e'] },
  { id: 3, tags: ['s', 't', 'x'] },
  { id: 4, tags: ['n', 'm', 'l'] },
]

const TEST_TAGS1 = ['a', 'c'];
const TEST_TAGS0 = [''];
console.log('BestMatch TEST1: ' + JSON.stringify(clarifai.getBestMatchFromTags(TEST_TAGS1, TEST_PAIRS)));
console.log('BestMatch TEST0: ' + JSON.stringify(clarifai.getBestMatchFromTags(TEST_TAGS0, TEST_PAIRS)));
console.log('BestMatches TEST1: ' + JSON.stringify(clarifai.getTop3MatchesFromTags(TEST_TAGS1, TEST_PAIRS)));