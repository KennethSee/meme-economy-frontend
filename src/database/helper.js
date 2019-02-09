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
  const yesterday = new Date(Date.now() - 864e5);

  const memesToHits = data["data"].reduce(
    (acc, hit) => {
      if (hit == null) {
        return acc;
      }

      const hitTime = new Date(hit["timestamp"]);
      // console.log(hitTime);
      if (hitTime < yesterday) {
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

  const sortedMemes = memeList.sort((meme1, meme2) => {
    if (memesToHits[meme1.memeId] == null) {
      return 1;
    } else if (memesToHits[meme2.memeId] == null) {
      return -1;
    } else {
      return memesToHits[meme2.memeId] - memesToHits[meme1.memeId]
    }
  });

  return sortedMemes;
  
}

// [timestamps] interval -> { timestamp, count }
// an interval can be one of:
// Hour, Day, Month
export const getPlotPoints = (timestamps, interval) => {
  // sort timestamps
  const sortedTimes = timestamps.map(date => new Date(date)).sort((date1, date2) => {
      if (date1 < date2) {
        return -1;
      }
      else {
        return 1;
      }
    }
  );
  const timesToHits = sortedTimes.reduce((acc, timestamp) => {
    let smolTimestamp = new Date();
    if (interval === "hour") {
      smolTimestamp = new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate(), timestamp.getHours());
    } else if (interval === "day") {
      smolTimestamp = new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate());
    } else {
      smolTimestamp = new Date(timestamp.getFullYear(), timestamp.getMonth());
    }
    // console.log(smolTimestamp);

    if (acc.length == 0 || acc[0].x.getTime() !== smolTimestamp.getTime()) {
      acc.unshift({ x: smolTimestamp, y: 1 });
      //console.log(acc[0].x.getTime());
      //console.log(smolTimestamp.getTime());
    } else {
      acc[0].y += 1;
    }
    return acc;
  }, []);
  return timesToHits;
}

export default { getMemeUrl, getGraph, getGraphBySite, getTrending, getPlotPoints }
