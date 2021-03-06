/**
 * Main REST API for the news articles
 * @author {Rob}@hackd.design
 */
let express = require('express');
let router = express.Router();
// let bookshelf = require('../init/bookshelf');
let Article = require('../models/article');
/**
 * Gets all articles in the db and return a JSON
 * @param {verb} get  
 */ 
router.get('/', function (req, res, next) {
    new Article().fetchAll()
  .then(function(articles) {
    res.send(articles.toJSON());
  }).catch(function(error){
    console.log(error);
    res.send('An error occurred in articles' + error);
  });
});
/**
 * Get a specific article.
 * @param {number} id
 * @param {verb} get
 */
router.get('/:id', function(req, res, next){
   let article = new Article();

   article.query('where', 'a_id', '=', req.params.id)
   .fetch()
   .then(function(article) {
   res.send(article);
   });
})
/** 
 *  Save a new article from a POST to the db.
 *  @param {verb} post
 *  @param {string} body The main textual content of the Article.
 *  @param {string} author The writer of the article.  
 */
router.post('/', function(req, res, next) {
  // Add ACL
  //  let date = new Date();
    let article = new Article();
    article.set('body', req.body.body);
    article.set('author', req.body.author);
   // article.set('updated_at', date.toDateString())
    article.save().then(function savedArticleSuccess(suc) {
      console.log('Aritcle Saved: ' + suc.get('body'));
    });
    res.send('success save');
});
/**
 * Update an already posted article.
 * @param {verb} post
 * @param {number} id use: /update/{id}
 */
router.post('/update/:id', function(req, res, next) {

// ADD ACL
  console.log(req.body.body);
  new Article()
  .query('where', 'a_id', '=', req.params.id)
  .save({ 
    body: req.body.body,
    author: req.body.author
  },
  {patch: true})
.then(function(model) {
    res.send(model);
  }).catch(function(er) {
    res.send('Error in Article Update: ' + er);
  })
});
/**
 * Delete an article.
 * NOT IMPLEMENTED
 * 
router.post('/drop-article/', function(req, res, next) {
  console.log(req.body.aid);
  Article.query('where', 'a_id', '=', req.body.aid )
  .destroy().then(function(model){
    res.send(model);  
  }).catch(function(error){
    res.send('delete article error: ' + error);
  });
});
 */

module.exports = router;