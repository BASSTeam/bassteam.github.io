import uglify from 'uglify-es';
export default process.argv.indexOf('--debug') != -1 ? { minify: s=>s={code:s} } : uglify;
