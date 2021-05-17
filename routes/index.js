const express = require("express");

const router = express.Router();
const Movie = require("../dbModels/movie");

router.get("/", async function(req,res){
  let movies = [];
  try{
    movies = await Movie.find().sort({ addedAt:"desc"}).limit(10).exec()
  } catch{
    movies =[];
  }
    res.render("index",{movies:movies});
});

module.exports = router;
