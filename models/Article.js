const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  headline: { type: string, required: true },
  author: { type: string },
  snippet: { type: string },
  url: { type: string, required: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;