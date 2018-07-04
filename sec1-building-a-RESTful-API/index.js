/*
	This is main file for this app
*/

const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

//Create a server which will just return hello world

const server = http.createServer((req, res)=>{

	let parsedURL = url.parse(req.url, true);
	
	//Parse the path
	let pathname = parsedURL.pathname;

	//parse the query string
	let queryString = parsedURL.query;

	//Method
	let method = req.method.toLowerCase();

	//Getting the payload from the request is bit tricky
	const decoder = new stringDecoder('utf-8');
	let buffer = '';

	req.on('data', (data) =>{
		buffer += decoder.write(data);
	});

	req.on('end' , ()=>{
		buffer += decoder.end();

		res.end('Hello world!!!');

		console.log('Buffer ', buffer);	
	})

});

//Start this server to listen on port 3000

server.listen(3000, ()=>{
	console.log('Server is started listening on port 3000');
})