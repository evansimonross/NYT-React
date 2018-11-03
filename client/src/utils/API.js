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
    return axios.post("/api/articles", data);
  }
};
