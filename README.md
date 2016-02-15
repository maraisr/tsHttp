# JavaScript XHR / AJAX Library
JavaScript XHR micro library written in TypeScript


## Usage (node)
At the moment i'm using XMLHttpRequest and for Node to work you need to `npm i XMLHttpRequest`.
```
XMLHttpRequest = (require('XMLHttpRequest')).XMLHttpRequest;

var HTTP = (require('./dist/http.js')).HTTP;

var r = new HTTP.Req('https://my-cool-api.io/');

r.get('some/sexy/endpoint', {with: optional: ['query', 'strings']}).then(function(response) {
	console.log(response.payload);
});
```


## Usage (umd)
```
require(['http'], function(http) {
	var HTTP = http.HTTP;

	var r = new HTTP.Req('https://my-cool-api.io/');

	r.get('some/sexy/endpoint', {with: optional: ['query', 'strings']}).then(function(response) {
		console.log(response.payload);
	});
})
```


### Setup
```
npm i -g tsc
npm i -g rollup
npm i
```
### Build
```
npm run build
```

### Development
```
npm run dev // For dev build
npm run watch // For watching
```
