import express from 'express';
const PORT = 1986;

import monstersData from './monstersData.json' assert { type: 'json' };

import * as dotenv from 'dotenv';
import { URL } from 'node:url';
import contentful from 'contentful';

const __dirname = new URL ('.', import.meta.url).pathname;

const client = contentful.createClient({
	space: 'pbgxh8642zcb',
	accessToken: '9oUj-6qcdUZu7naTzVd8tpT7qhDAjKxcrvRECYHJbwU'
})

dotenv.config();

const app = express();
const port = process.env.PORT || 1986;

console.log("- - - - LET'S GET STARTED - - - - ");

app.listen(port, function() {
	console.log("Server is listening at http://localhost:" + port);
});

//EJS setup
app.set('view engine', 'ejs');

//Static files setup
app.use( express.static('public') );
app.use( express.static('css') );

//Page Routes
//node + express
app.get('/', function(request, response) {
	//contentful
	client.getEntries({
	    content_type: 'monster',
   })
   .then(function (data) {

    //Get the list of monsters
   var newMonsterData = data.items.map( function(item) {
    	console.log(item.fields);
    		return {
    			name: item.fields.name,
    			birthday: item.fields.birthday,
    			story: item.fields.story.content,
    			adopted: item.fields.adopted,
    			portrait: item.fields.portrait.fields.file.url,
    		}
    })
    //Render each monster 
   // console.log(newMonsterData);
   response.render('home', {monsters: newMonsterData} );
   console.log("new monster data: ", newMonsterData);
   })
   .catch(console.error)

});

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

