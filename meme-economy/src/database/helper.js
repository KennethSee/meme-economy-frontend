import axios from 'axios';

class Meme {
  
  constructor(memeId, source, tags) {
    this.memeId = memeId;
    this.source = source;
    this.tags = tags;
  }
}

const getAllHits = async () => {
  const Url = 'https://memehits-18c19.firebaseio.com/.json';
  const data = await axios.get(Url);
  return data;
}

const getAllMemes = async () => {
  const url = 'https://memeeconomy-c73b8.firebaseio.com/.json';
  const data = await axios.get(url);
  return data;
}

// UUID -> Url
export const getMemeUrl = async (memeId) => {
  const data = await getAllMemes();
  const idList = data["data"].filter(meme => meme["id"] == memeId);
  return idList[0]["url"];
}

// UUID -> [timestamps]
export const getGraph = async (memeId) => {
  const data = await getAllHits();
  const timestamps = data["data"].filter(meme => meme != null && meme["meme_id"] === memeId).map(meme => meme["timestamp"]);
  return timestamps;
}

// UUID site -> [timestamps]
export const getGraphBySite = async (memeId, site) => {
  const data = await getAllHits();
  const timestamps = data["data"].filter(meme => meme["meme_id"] === memeId && meme["source"] === site).map(meme => meme["timestamp"]);
  return timestamps;
}

// -> [memes]
export const getTrending = async () => {
  const data = await getAllHits();
  const memesToHits = data["data"].reduce(
    (acc, hit) => {
      if (hit == null) {
        return acc;
      }

      const memeId = hit["meme_id"];

      if (acc[memeId]) {
        acc[memeId] += 1;
      } else {
        acc[memeId] = 1;
      }

      return acc;
    }, {}
  );

  const memes = await getAllMemes();

  const memeList = memes["data"].map(meme => new Meme(meme["id"], meme["url"], meme["tags"]));

  const sortedMemes = memeList.sort((meme1, meme2) => memesToHits[meme1.memeId] - memesToHits[meme2.memeId])

  console.log(sortedMemes);

  console.log(memeList);

  //return sortedMemes.map(meme => await 

  //memesToHitsList.sort((tuple1, tuple2) => tuple1[1] - tuple2[1]);

  //console.log(memesToHitsList);
  
}

export default { getMemeUrl, getGraph, getGraphBySite, getTrending }
