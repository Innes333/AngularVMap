(function(){
	angular.module('vMapsApp', ['ngRoute', 'ngStorage', 'ngWebsocket', 'leaflet-directive'])
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
					controller: 'mapCtrl',
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
				});

		}])
		.run(['$window', '$rootScope', '$http', '$location', '$localStorage', '$route', '$timeout', function($window, $rootScope, $http, $location, $localStorage, $route, $timeout) {
			$rootScope.$on('$locationChangeStart', function (event, next, current) {
				var publicPages = ['/'],
					restrictedPage = publicPages.indexOf($location.path()) === -1;
				if (restrictedPage && !$rootScope.appConfig.user){
					$location.path('/');
				} else if(!$rootScope.appConfig.user){
					$location.path('/');
					$rootScope.appConfig.user = false;
				};
				$rootScope.appConfig.preloader = true;
			});

			$rootScope.$on('$routeChangeSuccess', function() {
				$rootScope.appConfig.preloader = false;
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
		.constant('apiUrl',{
			baseUrl:  'http://localhost:3000/',
			loginUrl: 'login.json',
			itemsUrl:	'testJson.json',
			demoJSON: {
				railways: {
					name: 'Railways',
					type: 'line',
					className: 'drop',
					url: 'demoJSON/Railways',
					color: '#000000',
					bgc: '#000000',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.3,
				},
				roads: {
					name: 'Roads',
					type: 'line',
					className: 'roads',
					url: 'demoJSON/Roads',
					color: '#FF9800',
					bgc: '#FF9800',
					opacity: 1,
					fillOpacity: 1,
					weight: 2.0,
				},
				hydro: {
					name: 'Hydro',
					type: 'poly',
					className: 'hydro',
					url: 'demoJSON/Hydro(region)',
					color: 'blue',
					bgc: '#6aacf6',
					opacity: 0.6,
					fillOpacity: 0.8,
					weight: 1.0,
					zIndex: 300,
				},
				buildings: {
					name: 'Buildings',
					type: 'poly',
					className: 'buildings',
					img: 'cross.png',
					url: 'demoJSON/Buildings',
					color: '#333333',
					bgc: '#8f8f8f',
					opacity: 0.6,
					fillOpacity: 0.8,
					weight: 1.0,
					zIndex: 300,
				},
				nbn_metro_exist: {
					name: 'NBN Metro exist',
					type: 'line',
					className: 'nbn-metro-exist',
					url: 'demoJSON/NBN_Metro_exist',
					color: '#4A148C',
					bgc: '#4A148C',
					opacity: 1,
					fillOpacity: 1,
					weight: 2.5,
					zIndex: 300,
				},
				nbn_metro_moov: {
					name: 'NBN Metro MOOV',
					type: 'point',
					className: 'nbn-metro-moov',
					url: 'demoJSON/NBN_Metro_MOOV',
					color: '#4A148C',
					bgc: '#4A148C',
					opacity: 0.6,
					fillOpacity: 0.8,
					weight: 2.0,
					zIndex: 300,
				},
				ofc_12: {
					name: 'OFC-12',
					type: 'line',
					className: 'ofc-12',
					url: 'demoJSON/OFC_12',
					color: '#4CAF50',
					bgc: '#4CAF50',
					opacity: 1,
					fillOpacity: 1,
					weight: 2.0,
				},
				ofc_48: {
					name: 'OFC-48',
					type: 'line',
					className: 'ofc-48',
					img: 'ofc-48.png',
					url: 'demoJSON/OFC_48',
					color: '#FFC107',
					bgc: '#FFC107',
					opacity: 1,
					fillOpacity: 1,
					weight: 2.5,
				},
				ofc_144: {
					name: 'OFC-144',
					type: 'line',
					className: 'ofc-144',
					url: 'demoJSON/OFC_144',
					color: '#304FFE',
					bgc: '#304FFE',
					opacity: 1,
					fillOpacity: 1,
					weight: 3.5,
				},
				otb: {
					name: 'OTB',					
					type: 'point',
					url: 'demoJSON/OTB',
					color: '#000',
					zIndex: 510,
					bgc: '#975959',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.0,
					'radius': 4,
				},
				sc48: {
					name: 'SC-48',
					type: 'point',
					url: 'demoJSON/SC_48',
					zIndex: 510,
					color: '#000',
					bgc: '#33a02c',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.0,
					radius: 3,
				},
				sc144: {
					name: 'SC-144',
					type: 'point',
					url: 'demoJSON/SC_144',
					zIndex: 505,
					color: '#000',
					bgc: '#1e2cec',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.0,
					'radius': 4,
				},
			},
			testGeoJSON: {
				sc48: {
					name: 'SC-48',
					type: 'point',
					url: 'GeoJSON/Z_1_SC_48',
					zIndex: 510,
					color: '#000',
					bgc: '#33a02c',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.0,
					radius: 3,
				},
				sc144: {
					name: 'SC-144',
					type: 'point',
					url: 'GeoJSON/Z_1_SC_144',
					zIndex: 505,
					color: '#000',
					bgc: '#1e2cec',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.0,
					'radius': 4,
				},
				newPole: {
					name: 'New Pole',
					type: 'point',
					url: 'GeoJSON/Z_1_NEW_POLE',
					color: '#000',
					zIndex: 510,
					bgc: '#f2eb15',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.0,
					'radius': 3,
				},
				poteaux: {
					name: 'Poteaux',
					type: 'point',
					url: 'GeoJSON/Z_1_Poteaux',
					color: '#000',
					zIndex: 510,
					bgc: '#000',
					opacity: 0.6,
					fillOpacity: 1,
					weight: 1.0,
					'radius': 3,
				},
				cross: {
					name: 'Cross',
					type: 'point',
					url: 'GeoJSON/Z_1_CROSS',
					zIndex: 500,
					color: '#000',
					bgc: 'red',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.0,
					'radius': 3,
				},
				otb: {
					name: 'OTB',
					type: 'point',
					url: 'GeoJSON/Z_1_OTB',
					color: '#000',
					zIndex: 510,
					bgc: '#975959',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.0,
					'radius': 4,
				},
				drop: {
					name: 'Drop',
					type: 'line',
					className: 'drop',
					url: 'GeoJSON/Z_1_DROP',
					color: '#8b2b22',
					bgc: '#8b2b22',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.3,
				},
				ofc_12: {
					name: 'OFC-12',
					type: 'point',
					className: 'ofc-12',
					url: 'GeoJSON/Z_1_OFC_12',
					color: '#24dff0',
					bgc: '#23dff0',
					opacity: 1,
					fillOpacity: 0.2,
					weight: 3,
				},
				ofc_48: {
					name: 'OFC-48',
					type: 'point',
					className: 'ofc-48',
					img: 'ofc-48.png',
					url: 'GeoJSON/Z_1_OFC_48',
					color: '#88000f',
					bgc: '#88000f',
					opacity: 0.6,
					fillOpacity: 1,
					weight: 1.5,
				},
				ofc_144: {
					name: 'OFC-144',
					type: 'point',
					className: 'ofc-144',
					url: 'GeoJSON/Z_1_OFC_144',
					color: '#002af6',
					bgc: '#002af6',
					opacity: 0.6,
					fillOpacity: 0.2,
					weight: 1.0,
				},
				ofc_fig_8: {
					name: 'OFC-FIG-8',
					type: 'point',
					className: 'ofc-fig-48',
					url: 'GeoJSON/Z_1_OFC_FIG_8',
					color: '#ff001e',
					bgc: '#ff001e',
					opacity: 0.6,
					fillOpacity: 0.2,
					weight: 2,
				},
				buildings: {
					name: 'Buildings',
					type: 'poly',
					className: 'buildings',
					img: 'cross.png',
					url: 'GeoJSON/Z_1_Buildings',
					color: '#333333',
					bgc: '#8f8f8f',
					opacity: 0.6,
					fillOpacity: 0.8,
					weight: 1.0,
					zIndex: 300,
				},
				mdu: {
					name: 'MDU',
					type: 'poly',
					className: 'mdu',
					img: 'mdu.png',
					url: 'GeoJSON/Z_1_MDU',
					color: '#ff0ff7',
					bgc: '#ff0ff7',
					opacity: 0.8,
					fillOpacity: 1,
					weight: 1.0,
				},
			}
		})
		.constant('layersForRoles',{
			demoLayers: {
				roads: 'roads',
				railways: 'railways',
				buildings: 'buildings',
				hydro: 'hydro',
				ofc_12: 'ofc_12',
				ofc_48: 'ofc_48',
				ofc_144: 'ofc_144',
				otb: 'otb',
				sc48: 'sc48',
				sc144: 'sc144',
				nbn_metro_exist: 'nbn_metro_exist',
			},
			presidenceLayers: {
				sc48: 'sc48',
				sc144: 'sc144',
				newPole: 'newPole',
				poteaux: 'poteaux',
				cross: 'cross',
				otb: 'otb',
				drop: 'drop',
				ofc_12: 'ofc_12',
				ofc_48: 'ofc_48',
				ofc_144: 'ofc_144',
				ofc_fig_8: 'ofc_fig_8',
				buildings: 'buildings',
				mdu: 'mdu',
			},
			btiLayers: {
				sc48: 'sc48',
				sc144: 'sc144',
				cross: 'cross',
				ofc_144: 'ofc_144',
				ofc_48: 'ofc_48',
				ofc_fig_8: 'ofc_fig_8',
				buildings: 'buildings',
			},
			btsLayers: {
				poteaux: 'poteaux',
				newPole: 'newPole',
				otb: 'otb',
				ofc_12: 'ofc_12',
				ofc_48: 'ofc_48',
				ofc_144: 'ofc_144',
				drop: 'drop',
				buildings: 'buildings',
				mdu: 'mdu',
			}
		})
}());