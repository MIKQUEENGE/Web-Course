var crypto = require('crypto');
var key = 'web-programming';

module.exports =  function(db) {
	var fun = {
		userdata: "",	// 用于存储从数据库中获得的数据

		createUser: function(user) {
			db.collection(user.username).insert(encryptUser(user));
		},

		findUserByUsername: function(username) {
			db.collection(username).findOne({username : username}, function(err, data){
				fun.userdata = "";
				if (err) throw(err);
				fun.userdata = data;
			});
		},

		findUserByUsernameAndPassword: function(username, password) {
			db.collection(username).findOne({username : username, password : encrypt(password) }, function(err, data){
				fun.userdata = "";
				if (err) throw(err);
				fun.userdata = data;
			});
		}
	};
	return fun;
};

// 加密数据
function encrypt(str) {
	var cipher = crypto.createCipher('aes192', key);
	var enc = cipher.update(str, 'utf8', 'hex');
	enc += cipher.final('hex');
	return enc;
}

function decryptUser(user) {
	var another = {
		username : user.username,
		password : decrypt(user.password),
		studentId : user.studentId,
		phone : user.phone,
		email : user.email
	};
	return another;
}
