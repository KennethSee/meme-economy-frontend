const Clarifai = require('clarifai');
const ClarConfig = require('../Config').clarifai;

const ClarApp = new Clarifai.App(ClarConfig);

/**
 * Returns a Promise that resolves into all the tags for a given picture via url
 * Input:
 *  imgUrl: String
 * Output:
 *  Promise(ArrayOfStrings)
 */
export const getTagsFromUrl = async (imgUrl) => {
  const model = await ClarApp.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"});
  const response = await model.predict(imgUrl);
  const concepts =  await response['outputs'][0]['data']['concepts'];
  const tags = concepts.map(concept => concept.name);
  return tags;
}

/**
 * Returns a promise that resolves into all the tags for a given picture via base64Bytes
 * Input:
 *  base64Bytes: String
 * Output:
 *  Promise(ArrayOfStrings)
*/
export const getTagsFromImageFile = async (base64Bytes) => {
  const model = await ClarApp.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"});
  try {
    const response = await model.predict(Clarifai.GENERAL_MODEL, { base64: base64Bytes});
    const concepts =  await response['outputs'][0]['data']['concepts'];
    const tags = concepts.map(concept => concept.name);
    return tags;
  } catch(err) {
    console.log(err);
  }
}

/**
 * Compare the Tags of one Picture to the Tags of all other pictures
 * NOTE: for now just does best picture
 * 
 * Input:
 *  tagsOfOnePic: ArrayOfStrings
 *  allTagsAllPics: ArrayOf{ id: String, tags: ArrayOfStrings}
 * 
 * Return: the best match as { matchId: String, matchScore: Number }
 *  NOTE: If no match is found, { matchId: null, matchScore: 0 } will be returned;
 * 
 */
export const getBestMatchFromTags = (tagsOfOnePic, allTagsAllPics) => {
  let bestMatch = null;
  let bestScore = 0;
  let origSet = new Set(tagsOfOnePic);
  allTagsAllPics.forEach( tagPair => {
    let id = tagPair.id;
    let tags = tagPair.tags;
    let possibleSet = new Set(tags);
    let intersection = new Set([...origSet].filter(x => possibleSet.has(x)));
    let score = intersection.size;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = id;
    }
  })
  return { matchId: bestMatch, matchScore: bestScore };
}

/**
 * Compare the Tags of one Picture to the Tags of all other pictures
 * 
 * Input:
 *  tagsOfOnePic: ArrayOfStrings
 *  allTagsAllPics: ArrayOf{ id: String, tags: ArrayOfStrings}
 * 
 * Return: the best matches as ArrayOf { matchId: String, matchScore: Number }
 *  NOTE: If there aren't enough matches they will be { matchId: null, matchScore: 0 } each;
 * 
 */
export const getTopXMatchesFromTags = (tagsOfOnePic, allTagsAllPics, x) => { 
  let origSet = new Set(tagsOfOnePic);
  const tagsToScores = allTagsAllPics.map( tagPair => {
    let { id, tags }= tagPair;
    let possibleSet = new Set(tags);
    let intersection = new Set([...origSet].filter(x => possibleSet.has(x)));
    let matchScore = intersection.size;
    return { matchId: id, matchScore };
  });
  const bestScores = tagsToScores
    .filter(({matchScore}) => matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0,x);
  while (bestScores.length < x) {
    bestScores.push({ matchId: null, matchScore: 0 });
  }
  return bestScores;
}



export default { getTopXMatchesFromTags }
/***
 * Usage Instructions:
 * const clarifai = require('./clarifai');
 * clarifai.getTagsFromUrl('IMAGE_URL').then(answer => { doSomething(answer)} );
 */
