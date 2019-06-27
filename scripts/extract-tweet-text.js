const path = require("path");
const fs = require("fs");
const TinySegmenter = require("tiny-segmenter");
const { ngramsDistribution } = require("markovian-nlp");

const segmenter = new TinySegmenter();

const tweetJsFileAbsolutePaths = process.argv.slice(2);

window = {
  YTD: {
    tweet: {}
  }
};

for (const filePath of tweetJsFileAbsolutePaths) {
  // load js file
  require(filePath);
}

const tweetTexts = Object.values(window.YTD.tweet).flatMap(tweets => {
  return tweets
    .filter(tweet => tweet.full_text)
    .filter(tweet => tweet.entities.hashtags.length === 0)
    .filter(tweet => tweet.entities.symbols.length === 0)
    .filter(tweet => tweet.entities.user_mentions.length === 0)
    .filter(tweet => tweet.entities.urls.length === 0)
    .map(tweet => tweet.full_text);
});

const documents = tweetTexts.map(tweetText => segmenter.segment(tweetText).join(" "));

const distribution = ngramsDistribution(documents);

fs.writeFileSync(
  path.join(process.cwd(), "data/distribution.json"),
  JSON.stringify(distribution),
  "utf8"
);
