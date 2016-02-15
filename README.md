JavaScript Object Oriented XHR Library
======================================
JavaScript XHR micro library written in [TypeScript](https://github.com/Microsoft/TypeScript)

[![npm version](https://badge.fury.io/js/tshttp.svg)](https://badge.fury.io/js/tshttp)
[![Bower version](https://badge.fury.io/bo/tshttp.svg)](https://badge.fury.io/bo/tshttp)

#### Install with [npm](https://www.npmjs.com/)
```sh
$ npm i tshttp --save
```

#### Install with [bower](http://bower.io/)
```sh
$ bower i tshttp --save
```

## Example Usage (umd)
```JavaScript
require(['tsHttp'], function(http) {
	var HTTP = http.HTTP;

	var c = new HTTP.Client('https://my-cool-api.io/');

	c.get('some/sexy/endpoint', {with: optional: ['query', 'strings']}).then(function(response) {
		console.log(response.json);
	});

	var p = new HTTP.Pool(r, [
		(new HTTP.Request('GET', {ep: 'some'})),
		(new HTTP.Request('GET', {ep: 'array'})),
		(new HTTP.Request('GET', {ep: 'of'})),
		(new HTTP.Request('GET', {ep: 'batched'})),
		(new HTTP.Request('GET', {ep: 'requests'}))
	]);

	p.send().then(function(promises) {
		console.log(promises);
		/*
		The promises array contains and array of Response objects
		*/
	});
})
```

## Example Usage (node)
At the moment I'm using [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and for Node to work you need to `npm i XMLHttpRequest`. And add `XMLHttpRequest = (require('XMLHttpRequest')).XMLHttpRequest;` before the require.

```JavaScript
XMLHttpRequest = (require('XMLHttpRequest')).XMLHttpRequest;

var HTTP = (require('tsHttp')).HTTP;

var c = new HTTP.Client('https://my-cool-api.io/');

c.get('some/sexy/endpoint', {with: optional: ['query', 'strings']}).then(function(response) {
	console.log(response.json);
});
```

## Building

To build:
- `npm i -g tsc`
- `npm i -g rollup`
- `npm i`
- `npm run watch` or `npm run dev`

`npm run watch` will clean the tmp and dev folders, build the dev version (`npm run dev`), and start watching. This file contains inline sourcemaps (what Rollup produce).

For a release: `npm run build` - which will minify, and run other optimization tasks over the file. This does not include source maps.
