const express = require("express");
const router = express.Router();
const articlesController = require("../../controllers/articlesController");
const axios = require("axios");
require('dotenv').config()

//    ./api/articles
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

//    ./api/articles/search
router
  .route("/search")
  .post(function(req, res){
    let params = {
      "api-key": process.env.API_KEY,
      "q": req.body.q
    };
    if(req.body.begin_date) { params.begin_date = req.body.begin_date; }
    if(req.body.end_date) { params.end_date = req.body.end_date; }
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      params: params
    })
    .then(function(response){
      res.json(response.data.response.docs);
    })
    .catch(function(error){
      res.send("ERROR");
    })
  });

//    ./api/articles/:id
router
  .route("/:id")
  .get(articlesController.findById)
  .delete(articlesController.remove);
  
module.exports = router;
