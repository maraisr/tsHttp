JavaScript Object Oriented XHR Library
======================================
JavaScript XHR micro library written in [TypeScript](https://github.com/Microsoft/TypeScript)


## Usage (node)
At the moment I'm using [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and for Node to work you need to `npm i XMLHttpRequest`.
```JavaScript
XMLHttpRequest = (require('XMLHttpRequest')).XMLHttpRequest;

var HTTP = (require('tsHttp')).HTTP;

var r = new HTTP.Client('https://my-cool-api.io/');

r.get('some/sexy/endpoint', {with: optional: ['query', 'strings']}).then(function(response) {
	console.log(response.payload);
});
```


## Usage (umd)
```JavaScript
require(['tsHttp'], function(http) {
	var HTTP = http.HTTP;

	var r = new HTTP.Client('https://my-cool-api.io/');

	r.get('some/sexy/endpoint', {with: optional: ['query', 'strings']}).then(function(response) {
		console.log(response.payload);
	});
})
```

## Building

### Setup
```Bash
npm i -g tsc
npm i -g rollup
npm i
```
### Build
```Bash
npm run build
```

### Development
```Bash
npm run dev // For dev build
npm run watch // For watching & then also building
```
