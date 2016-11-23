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

// GET /bookmaker 
app.get('/bookmaker', function(req, res){ 
res.json(bookmaker); 
}); 

// GET /bookmaker/:id 
app.get('/bookmaker/:id', function(req, res){ 
var bookmakerId = parseInt(req.params.id, 10); 
var matchedBookmaker = _.findWhere(bookmaker, {id: bookmakerId}); 

if(matchedBookmaker){ 
res.json(matchedBookmaker); 
}else{ 
res.status(404).send(); 
} 



}); 

// POST /bokmaker 

app.post('/bookmaker', function(req, res){ 
var body = _.pick(req.body, 'name_of_sport', 'sum_of_bet', 'odd'); 

if(!_.isString(body.name_of_sport) || body.name_of_sport.trim().length === 0 
|| body.sum_of_bet.length===0 || !_.isNumber(body.sum_of_bet) || body.odd.length===0 || !_.isNumber(body.odd) ){ 

return res.status(400).send(); 
} 

body.name_of_sport = body.name_of_sport.trim(); 
body.Number_of_bet = bookmakerNextId++; 

body.You_can_win = Math.round(body.sum_of_bet*body.odd); 
body.Yoc_can_withdraw = Math.round(body.sum_of_bet*body.odd/1.3) 

bookmaker.push(body); 
res.json(body.Number_of_bet + ')' + body.name_of_sport +' ' + 'is name of your sport betting, odd for this betting is'+ ' ' + body.odd + ', ' + 'amount of bet - ' + body.sum_of_bet+ '.' + ' You can win - ' 
+ (Math.round(body.sum_of_bet*body.odd)) + '.'  + ' You can withdraw = ' + (Math.round(body.sum_of_bet*body.odd/1.3)));

}); 


//Delete 
app.delete('/bookmaker/:Number_of_bet', function(req,res){ 
var BookmakerNumber_of_bet = parseInt(req.params.Number_of_bet,10); 
var matchedBookmaker = _.findWhere(bookmaker, {Number_of_bet: BookmakerNumber_of_bet}); 

if(!matchedBookmaker){ 
res.status(404).json("Bet with this number is doesn't found"); 
}else{ 
bookmaker = _.without(bookmaker, matchedBookmaker); 
res.json(matchedBookmaker); 
} 
}); 

app.listen(PORT, function(){ 
console.log('Express listening on port ' + PORT + '!'); 
});
