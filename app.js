import express from 'express';
const PORT = 2000;

import monstarsData from './monstarsData.json' assert { type: 'json' };

import { URL } from 'node:url';
const __dirname = new URL ('.', import.meta.url).pathname;

const app = express();
console.log("Hi");

//EJS setup
app.set('view engine', 'ejs');

//Static files setup
app.use(express.static('public'));

//Page Routes
app.get('/', function(request, response) {
	response.render('home', { monstarsData });
	response.sendFile('.styles/site.css', { root: __dirname });
})

app.get('/monstars', function(request, response) {
	response.render("monstars", { monstarsData });
});

app.get('/detail', function(request, response) {
	response.render('detail');
});

app.use( function(request, response) {
	response.status(404).render('404', { query: request.url });
});

app.listen(PORT, function() {
	console.log("Server is listening at http://localhost:2000");
});
