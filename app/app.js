(function(){
	angular.module('nameApp', ['ngRoute', 'ngStorage', 'ngWebsocket', 'leaflet-directive'])
		.constant('apiUrl',{
			'baseUrl':  'http://localhost:3000/',
			'loginUrl': 'login.json',
			'itemsUrl':	'testJson.json',
			'geoJsonUrl': 'GeoJSON/',
			'layersGeoJSON': {
				'drop': {
					'name': 'Drop',
					'url': 'GeoJSON/Z_1_DROP',
					'color': '#b96763',
					'bgc': '#b96763'
				},
				'buildings': {
					'name': 'Buildings',
					'url': 'GeoJSON/Z_1_Buildings',
					'color': 'orange',
					'bgc': 'orange'
				},
				'cross': {
					'name': 'Cross',
					'url': 'GeoJSON/Z_1_CROSS',
					'color': 'red',
					'bgc': 'red'
				},
				'mdu': {
					'name': 'MDU',
					'url': 'GeoJSON/Z_1_MDU',
					'color': '#ff0ff7',
					'bgc': '#ff0ff7'
				},
				'otb': {
					'name': 'OTB',
					'url': 'GeoJSON/Z_1_OTB',
					'color': '#00df43',
					'bgc': '#00df43'
				},
				'areaOtb': {
					'name': 'Area OTB',
					'url': 'GeoJSON/Z_1_AREA_OTB',
					'color': '#d4a2f9',
					'bgc': '#d4a2f9'
				},
				'squares': {
					'name': 'Squares',
					'url': 'GeoJSON/Z_1_Squares',
					'color': '#ee8c59',
					'bgc': '#ee8c59'
				},
				'ofc-12': {
					'name': 'OFC-12',
					'url': 'GeoJSON/Z_1_OFC_12',
					'color': '#ee8c59',
					'bgc': '#ee8c59'
				},
				'ofc-48': {
					'name': 'OFC-48',
					'url': 'GeoJSON/Z_1_OFC_48',
					'color': '#ee8c59',
					'bgc': '#ee8c59'
				},
				'ofc-fig-8': {
					'name': 'OFC-FIG-8',
					'url': 'GeoJSON/Z_1_OFC_FIG_8',
					'color': '#ee8c59',
					'bgc': '#ee8c59'
				}
			}
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
			.when('/contact', {
				templateUrl: 'components/contact-controller/contact-ctrl.html',
				controller: 'mapCtrl'
			})
			.when('/about', {
				templateUrl: 'components/about-controller/about-ctrl.html',
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
				if(restrictedPage && !$rootScope.appConfig.user){
					$location.path('/');
				}else if(!$rootScope.appConfig.user){
					$location.path('/');
					$rootScope.appConfig.user = false;
				};
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