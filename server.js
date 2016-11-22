var express = require('express'); 
var bodyParser = require('body-parser'); 
var _ = require('underscore'); 

var app = express(); 
var PORT = process.env.PORT || 3000; 
var bookmaker = [];  
var bookmakerNextId = 1; 

app.use(bodyParser.json()); 

app.get('/', function(req, res){ 
res.send('Peak of Triumph'); 
}); 

// GET /todos 
app.get('/bookmaker', function(req, res){ 
res.json(bookmaker); 
}); 

// GET /todos/:id 
app.get('/bookmaker/:id', function(req, res){ 
var bookmakerId = parseInt(req.params.id, 10); 
var matchedbookmaker = _.findWhere(bookmaker, {id: bookmakerId}); 

if(matchedbookmaker){ 
res.json(matchedbookmaker); 
}else{ 
res.status(404).send(); 
} 
}); 

// POST /todos 

app.post('/bookmaker', function(req, res){ 
var body = _.pick(req.body, 'name_of_sport', 'sum_of_bet', 'odd'); 

if(!_.isString(body.name_of_sport) || body.name_of_sport.trim().length === 0 
|| body.sum_of_bet.length===0 || !_.isNumber(body.sum_of_bet) || body.odd.length===0 || !_.isNumber(body.odd) )


{ 

return res.status(400).send(); 
} 

body.name_of_sport = body.name_of_sport.trim(); 
body.id = bookmakerNextId++; 


bookmaker.push(body.id + ') ' + body.name_of_sport + ' ' + 'is name of your sport betting, odd for this betting is'+ ' ' + body.odd + ', ' + 'amount of bet - '+ body.sum_of_bet+ '.' + ' You can win - ' 
+ (Math.round(body.sum_of_bet*body.odd)))



res.json(body.id + ')' + body.name_of_sport +' ' + 'is name of your sport betting, odd for this betting is'+ ' ' + body.odd + ', ' + 'amount of bet - ' + body.sum_of_bet+ '.' + ' You can win - ' 
+ (Math.round(body.sum_of_bet*body.odd))); 

}); 

app.delete('/bookmaker/:id', function(req,res){ 
var bookmakerId = parseInt(req.params.id,10); 
var matchedbookmaker = _.findWhere(studioexx, {id: studioId}); 

if(!matchedstudio){ 
res.status(404).json({"error": "no account found with that id"}); 
}else{ 
studioexx = _.without(studioexx, matchedstudio); 
res.json(matchedstudio); 
} 
}); 



app.listen(PORT, function(){ 
console.log('Express listening on port ' + PORT + '!'); 
});