// tooling
const browserslist = require('browserslist');
const fsReadFile   = require('./lib/read-file');
const nodeResolve  = require('./lib/resolve');
const path         = require('path');

// path to an empty js file
const pathToEmptyJS = path.join(__dirname, 'lib', 'empty.js');

// plugin
module.exports = (opts = {}) => ({
	name: 'polyfill',
	resolveId(importee, importer) {
		// options
		const browsers   = opts.browsers || null;
		const from       = opts.from || process.cwd();
		const useJsnext  = opts.jsnext === true
		const useModules = opts.module !== false;

		if (!importer) {
			// disregard entry modules
			return null;
		}

		return nodeResolve(
			// resolve the import using the node require.resolve() algorithm
			importee,
			{
				basedir: path.dirname(importer),
				packageFilter(pkg, pkgfile) {
					pkg.main = pkgfile;

					return pkg;
				}
			}
		).then(
			// read package
			(pkgfile) => fsReadFile(pkgfile, 'utf8').then(
				// parsed package data
				(json) => JSON.parse(json)
			).then(
				// browser targets, path to the package
				(pkg) => ({
					targets: pkg.browserstarget,
					pathToImportJS: useModules && pkg.module ? path.resolve(path.dirname(pkgfile), pkg.module)
						: useJsnext && pkg['jsnext:main'] ? path.resolve(path.dirname(pkgfile), pkg['jsnext:main'])
						: path.resolve(path.dirname(pkgfile), pkg.main)
				})
			)
		).then(
			// conditionally load import
			({ targets, pathToImportJS }) => {
				// browsers requiring the polyfill
				const targettedBrowsers = browserslist(
					targets
				);

				// browsers requesting support
				const supportedBrowsers = browserslist(
					browsers,
					{
						from
					}
				);

				// whether the browser requesting support requires the polyfill
				const needsSupport = targettedBrowsers.some(
					(browser) => ~supportedBrowsers.indexOf(browser)
				);

				if (needsSupport) {
					// use the path to the import js
					return pathToImportJS;
				} else {
					// use the path to the empty js
					return pathToEmptyJS;
				}
			},
			() => {}
		)
	}
});
