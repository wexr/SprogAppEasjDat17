var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ordbogModel = require('../models/ordbogModel');
var ordbog = mongoose.model('Ordbog', ordbogModel.ordbogSchema, 'ordbog');
mongoose.connect('mongodb://stenboeg:stenboeg1234@ds155653.mlab.com:55653/sprogappmongodb', {  useNewUrlParser: true });

/*router.get('/', function(req, res, next){
    res.render('visord');
});*/

module.exports = router;