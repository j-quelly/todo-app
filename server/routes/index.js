var express = require('express'),
	router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', {
    //     title: 'Two Deux'
    // });
	console.log(path.join(__dirname, '../client', 'index.html'));
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

module.exports = router;
