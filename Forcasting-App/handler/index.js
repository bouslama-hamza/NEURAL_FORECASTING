const model = require('../model/load');
const predict = require('../model/load');

// SIGN IN
function dashboard(req, res, next) {
	try {
		predict.predict();
		return res.status(200).render('./index', {
			title: 'Se connecter',
			url: req.originalUrl,
		});
	} catch (error) {
		console.log(error);
	}
}

// exports
module.exports = {
    dashboard,
};