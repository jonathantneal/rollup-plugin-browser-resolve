const { readFile } = require('fs');

module.exports = (file, opts) => new Promise(
	(promiseResolve, promiseReject) => readFile(
		file,
		opts,
		(error, result) => error ? promiseReject(error) : promiseResolve(result)
	)
);

