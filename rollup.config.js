import babel from 'rollup-plugin-babel';

export default {
	entry: 'tmp/HTTP.js',
	dest: 'dist/bundle.js',
	plugins: [babel()],
	format: 'umd',
	moduleName: 'HTTP'
};