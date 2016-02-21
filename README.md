Object Oriented XHR Library
===========================

<p align="center">
	<a href="https://www.npmjs.com/package/tshttp">
		<img src="https://img.shields.io/npm/v/tshttp.svg" alt="npm version">
	</a>
	<a href="https://github.com/maraisr/tsHttp">
		<img src="https://img.shields.io/bower/v/tshttp.svg" alt="bower version">
	</a>
	<a href="https://github.com/maraisr/tsHttp/blob/master/LICENSE.md">
		<img src="https://img.shields.io/npm/l/tshttp.svg" alt="license">
	</a>
</p>

> JavaScript XHR micro library written in [TypeScript](https://github.com/Microsoft/TypeScript)

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

	c.get('some/sexy/endpoint', {with: {optional: ['query', 'strings']}}).then(function(response) {
		console.log(response.json);
	});

	var p = new HTTP.Pool(c, [
		(new HTTP.Request(HTTP.GET, {ep: 'some'})),
		(new HTTP.Request(HTTP.GET, {ep: 'array'})),
		(new HTTP.Request(HTTP.GET, {ep: 'of'})),
		(new HTTP.Request(HTTP.GET, {ep: 'batched'})),
		(new HTTP.Request(HTTP.GET, {ep: 'requests'}))
	]);

	p.send().then(function(response, index) {
		console.log(response, index);
		/*
		Argument 1 is the repsonse object, and index is the index of the pool array.
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

c.get('some/sexy/endpoint', {with: {optional: ['query', 'strings']}}).then(function(response) {
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
