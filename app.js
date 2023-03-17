import express from 'express';
const PORT = 1986;

import monstersData from './monstersData.json' assert { type: 'json' };

import { URL } from 'node:url';
const __dirname = new URL ('.', import.meta.url).pathname;

const app = express();
console.log("- - - - LET'S GET STARTED - - - - ");

app.listen(PORT, function() {
	console.log("Server is listening at http://localhost:" + PORT);
});

//EJS setup
app.set('view engine', 'ejs');

//Static files setup
app.use(express.static('public'));
app.use(express.static('css'));

//Page Routes
app.get('/', function(request, response) {
	response.render('home', { monsters: monstersData });
})

app.get('/monsters', function(request, response) {
	response.render("monsters", { monsters: monstersData });
});

app.get('/monsters/:slug', function(request, response) {

	const foundMonster = monstersData.find( function(monster) {
		return monster.slug == request.params.slug;
	})
	response.render("detail", { foundMonster });
});

app.get('/detail', function(request, response) {
	response.render('detail');
});

app.use( function(request, response) {
	response.status(404).render('404', { query: request.url });
});

