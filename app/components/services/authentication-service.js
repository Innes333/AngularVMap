(function(){
	angular
		.module('vMapsApp')
			.factory('AuthenticationService', ['$rootScope', '$http', 'apiUrl',
				function($rootScope, $http, apiUrl) {

				this.Login = function(user, callback) {
					var roles = {
						admin: [{
							name: 'admin',
							password: '1'
						}],
						presidence: [{
							name: 'presidence',
							password: '123+'
						}],
						bti: [{
							name: 'bti',
							password: '123+'
						}],
						bts: [{
							name: 'bts',
							password: '123+'
						}]
					};
					for(role in roles) {
						var item = roles[role];
						for(var i=0; i< item.length; i++) {
							if (user.username === item[i].name && user.password === item[i].password) {
								callback(true);
								return;
							} else {
								callback(false);
							}
						}
					}
				};
				this.Logout = function(){					
					$rootScope.appConfig.user = false;
				};
				var service = {
					Login: this.Login,
					Logout: this.Logout
				};
				return service;
		}])
}());