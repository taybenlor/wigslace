
module.exports = {
  // Change passwords
  'password$post': function(req, res) {
		if (!req.user) { return res.send({type: 'error', message: 'You are not logged in.'}); }
		var post = req.body;

		// Validate passwords
		try {
			validator.check(post.password, {
				len: 'Please ensure your password is at least 6 characters long.'
			, equals: 'Please enter the same password twice.'
			}).len(6).equals(post.password_confirm);
		}
		catch (e) {
			return res.send({type: 'error', message: e.message});
		}

		wigslace.model.user.checkPassword(req.user.name, post.password_original, function(err, correct) {
			if (err) { return res.send({type: 'error', message: 'Something went wrong checking your password.'}); }
			if (!correct) { return res.send({type: 'error', message: 'Your old password is incorrect.'}); }
			// All the checks have passed, we can finally change their password
			wigslace.model.user.changePassword(req.user.name, post.password, function(err) {
				if (err) { return res.send({type: 'error', message: 'Something went wrong saving your new password.'}); }
				res.send({type: 'success', message: 'New password set.'});
			});
		});
  }
}
