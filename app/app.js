(function(){
	angular.module('nameApp', ['ngRoute', 'ngStorage', 'ngWebsocket', 'leaflet-directive'])
		.constant('apiUrl',{
			"baseUrl":  'http://localhost:3000/',
			"loginUrl": 'login.json',
			"itemsUrl":	"testJson.json",
			"geoJsonUrl": "GeoJSON/"
		})
		.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
			$httpProvider.defaults.headers.common['X-Requested-With'];
			$httpProvider.defaults.headers.post   = {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8; Access-Control-Expose-Headers=*'};
			$httpProvider.defaults.headers.delete = {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'};
			$httpProvider.defaults.useXDomain     = true;

			$routeProvider
			.when('/', {
				templateUrl: 'components/authorization-controller/authorization-contoller.html',
				controller: 'loginCtrl'
			})
			.when('/map', {
				templateUrl: 'components/map-controller/map-ctrl.html',
				controller: 'mapCtrl'
			})
			.otherwise({
				redirectTo: '/'
			})
		}])
		.run(['$window', '$rootScope', '$http', '$location', '$localStorage', '$route', '$timeout', function($window, $rootScope, $http, $location, $localStorage, $route, $timeout) {
			$rootScope.$on('$locationChangeStart', function (event, next, current) {
				var publicPages = ['/'],
						restrictedPage = publicPages.indexOf($location.path()) === -1;
				// if(restrictedPage && !$rootScope.appConfig.user){
				// 	$location.path('/');
				// }else if(!$rootScope.appConfig.user){
				// 	$location.path('/');
				// 	$rootScope.appConfig.user = false;
				// };
			});

			$rootScope.appConfig = {
				preloader: false,
				user: false,
				appError: {
					status: false,
					message: ''
				}
			};
		}])
}());