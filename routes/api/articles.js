const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");
const axios = require("axios");

//    ./api/articles
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

//    ./api/articles/:id
router
  .route("/:id")
  .get(articlesController.findById)
  .delete(articlesController.remove);

//    ./api/articles/search
router
  .route("/search")
  .get(function(req, res){
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      params: {
        "api-key": process.env.API_KEY,
        "q": req.q,
        "begin_date": req.begin_date,
        "end_date": req.end_date
      }
    })
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      res.json(err);
    })
  });

module.exports = router;
