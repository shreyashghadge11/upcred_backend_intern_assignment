

function authentication(req, res, next) {
	var authheader = req.headers.authorization;
	// console.log(req.headers);

	if (!authheader) {
		res.status(401).json({ message: 'Missing Authorization Header' })
	}

	var auth = new Buffer.from(authheader.split(' ')[1],'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	if (user == 'admin' && pass == 'password') {
		next();
	} else {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
	}

};

module.exports = authentication;



