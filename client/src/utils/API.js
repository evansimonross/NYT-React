import axios from "axios";

export default {
  getArticles: function() {
    return axios.get("/api/articles");
  },
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  saveArticle: function(data) {
    return axios.post("/api/articles", {
      headline: data.headline.main,
      web_url: data.web_url,
      snippet: data.snippet
    });
  },
  searchArticles: function(data) {
    return axios.post("/api/articles/search", data);
  }
};
