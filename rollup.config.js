import babel from 'rollup-plugin-babel';

export default {
	entry: 'tmp/HTTP.js',
	dest: 'dist/tsHttp.js',
	plugins: [babel()],
	format: 'umd',
	moduleName: 'tsHttp',
	sourceMap: 'inline'
};
