(function(){
	angular.module('nameApp', ['ngRoute', 'ngStorage', 'ngWebsocket', 'leaflet-directive'])
		.constant('apiUrl',{
			'baseUrl':  'http://localhost:3000/',
			'loginUrl': 'login.json',
			'itemsUrl':	'testJson.json',
			'geoJsonUrl': 'GeoJSON/',
			'pointGeoJSON': {
				'otb': {
					'name': 'OTB',
					'url': 'GeoJSON/Z_1_OTB',
					'img': 'otb.png',
				},
				'cross': {
					'name': 'Cross',
					'url': 'GeoJSON/Z_1_CROSS',
					'img': 'cross.png',
				},
				'sc-144': {
					'name': 'SC-144',
					'url': 'GeoJSON/Z_1_SC_144',
					'img': 'sc-144.png',
				},
				'sc-48': {
					'name': 'SC-48',
					'url': 'GeoJSON/Z_1_SC_48',
					'img': 'sc-48.png',
				},
				'poteaux': {
					'name': 'Poteaux',
					'url': 'GeoJSON/Z_1_Poteaux',
					'img': 'poteaux.png',
				},
				'new-pole': {
					'name': 'New Pole',
					'url': 'GeoJSON/Z_1_NEW_POLE',
					'img': 'new-pole.png',
				},
			},
			'polyGeoJSON': {
				'areaTrunk': {
					'name': 'Area Trunk',
					'className': 'area-trunk',
					'img': 'area-trunk.png',
					'url': 'GeoJSON/Z_1_AREA_TRUNK',
					'color': '#c89696',
					'bgc': '#c89696',
					'opacity': 0.9,
					'fillOpacity': 0.7,
					'weight': 1.0,
				},
				'buildings': {
					'name': 'Buildings',
					'className': 'buildings',
					'img': 'cross.png',
					'url': 'GeoJSON/Z_1_Buildings',
					'color': 'orange',
					'bgc': 'orange',
					'opacity': 0.6,
					'fillOpacity': 0.6,
					'weight': 1.0,
				},
				'areaOtb': {
					'name': 'Area OTB',
					'className': 'area-otb',
					'img': 'area-otb.png',
					'url': 'GeoJSON/Z_1_AREA_OTB',
					'color': '#daadf9',
					'bgc': '#daadf9',
					'opacity': 1,
					'fillOpacity': 0,
					'weight': 3.0,
				},
				'ofc-12': {
					'name': 'OFC-12',
					'className': 'ofc-12',
					'img': 'ofc-12.png',
					'url': 'GeoJSON/Z_1_OFC_12',
					'color': '#23dff0',
					'bgc': '#23dff0',
					'opacity': 1,
					'fillOpacity': 0.2,
					'weight': 3,
				},
				'ofc-48': {
					'name': 'OFC-48',
					'className': 'ofc-48',
					'img': 'ofc-48.png',
					'url': 'GeoJSON/Z_1_OFC_48',
					'color': '#88000f',
					'bgc': '#88000f',
					'opacity': 0.6,
					'fillOpacity': 1,
					'weight': 1.5,
				},
				'ofc-fig-8': {
					'name': 'OFC-FIG-8',
					'className': 'ofc-fig-48',
					'img': 'ofc-fig.png',
					'url': 'GeoJSON/Z_1_OFC_FIG_8',
					'color': '#ff001e',
					'bgc': '#ff001e',
					'opacity': 0.6,
					'fillOpacity': 0.2,
					'weight': 1.0,
				},
				'ofc-144': {
					'name': 'OFC-144',
					'className': 'ofc-144',
					'img': 'ofc-144.png',
					'url': 'GeoJSON/Z_1_OFC_144',
					'color': '#002af6',
					'bgc': '#002af6',
					'opacity': 0.6,
					'fillOpacity': 0.2,
					'weight': 1.0,
				},
				'drop': {
					'name': 'Drop',
					'className': 'drop',
					'img': 'ofc-48.png',
					'url': 'GeoJSON/Z_1_DROP',
					'color': '#88000f',
					'bgc': '#88000f',
					'opacity': 1,
					'fillOpacity': 1,
					'weight': 1.5,
				},
				'mdu': {
					'name': 'MDU',
					'className': 'mdu',
					'img': 'mdu.png',
					'url': 'GeoJSON/Z_1_MDU',
					'color': '#ff0ff7',
					'bgc': '#ff0ff7',
					'opacity': 0.8,
					'fillOpacity': 1,
					'weight': 1.0,
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