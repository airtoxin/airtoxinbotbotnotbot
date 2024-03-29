/* eslint-disable */
const path = require("path");
const fs = require("fs");
const TinySegmenter = require("tiny-segmenter");
const markov = require("hx-markov-chain");

const segmenter = new TinySegmenter();

const tweetJsFileAbsolutePaths = process.argv.slice(2);

window = {
  YTD: {
    tweet: {},
  },
};

for (const filePath of tweetJsFileAbsolutePaths) {
  require(filePath);
}

const tweetTexts = Object.values(window.YTD.tweet).flatMap((tweets) => {
  return tweets
    .filter((tweet) => tweet.tweet.full_text)
    .filter((tweet) => tweet.tweet.entities.hashtags.length === 0)
    .filter((tweet) => tweet.tweet.entities.symbols.length === 0)
    .filter((tweet) => tweet.tweet.entities.user_mentions.length === 0)
    .filter((tweet) => tweet.tweet.entities.urls.length === 0)
    .map((tweet) => tweet.tweet.full_text);
});

const segmentsList = tweetTexts.map((tweetText) =>
  segmenter.segment(tweetText)
);

const model = markov.create();

for (const segments of segmentsList) {
  try {
    markov.update(model, segments);
  } catch (e) {
    console.error(e);
    console.error(segments);
  }
}

fs.writeFileSync(
  path.join(process.cwd(), `data/markov_model.json`),
  JSON.stringify(model),
  "utf8"
);
