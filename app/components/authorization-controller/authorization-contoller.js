(function(){
	angular.module('vMapsApp')
		.controller('loginCtrl', ['$scope', '$location', '$localStorage', '$rootScope', 'AuthenticationService', function($scope, $location, $localStorage, $rootScope,AuthenticationService){			
			$rootScope.appConfig.user = false;
			var initController = function(){
				AuthenticationService.Logout();
			}();
			$scope.login = function(user){			
				AuthenticationService.Login(user, function (result){
					if(result === true) {
						$location.path('/map');
						$rootScope.appConfig.user = user;						
					}else if(typeof result === 'object'){
						$scope.error = result.data;			
					}else{
						$scope.error = 'Please enter a valid login and password';
					}
				});
			}

		}]);
}());