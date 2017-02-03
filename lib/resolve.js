const resolve = require('resolve');

module.exports = (id, opts) => new Promise(
	(promiseResolve, promiseReject) => resolve(
		id,
		opts,
		(error, result) => error ? promiseReject(error) : promiseResolve(result)
	)
);
