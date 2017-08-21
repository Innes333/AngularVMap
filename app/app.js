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
			geoJsonUrl: 'GeoJSON/',
			pointGeoJSON: {
				sc48: {
					name: 'SC-48',
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
					url: 'GeoJSON/Z_1_OTB',
					color: '#000',
					zIndex: 510,
					bgc: '#975959',
					opacity: 1,
					fillOpacity: 1,
					weight: 1.0,
					'radius': 4,
				},
			},
			polylineGeoJSON: {
				drop: {
					name: 'Drop',
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
					className: 'ofc-fig-48',
					url: 'GeoJSON/Z_1_OFC_FIG_8',
					color: '#ff001e',
					bgc: '#ff001e',
					opacity: 0.6,
					fillOpacity: 0.2,
					weight: 2,
				},
			},
			polyGeoJSON: {
				buildings: {
					name: 'Buildings',
					className: 'buildings',
					img: 'cross.png',
					url: 'GeoJSON/Z_1_Buildings',
					color: '#b8b8b8',
					bgc: '#b8b8b8',
					opacity: 0.6,
					fillOpacity: 0.8,
					weight: 1.0,
					zIndex: 300,
				},
				mdu: {
					name: 'MDU',
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
			adminLayers: {
				point: {
					sc48: 'sc48',
					sc144: 'sc144',
					newPole: 'newPole',
					poteaux: 'poteaux',
					cross: 'cross',
					otb: 'otb',
				},
				polyline: {
					drop: 'drop',
					ofc_12: 'ofc_12',
					ofc_48: 'ofc_48',
					ofc_144: 'ofc_144',
					ofc_fig_8: 'ofc_fig_8',
				},
				polygon: {
					buildings: 'buildings',
					mdu: 'mdu',
				},
			},
			presidenceLayers: {
				point: {
					sc48: 'sc48',
					sc144: 'sc144',
					newPole: 'newPole',
					poteaux: 'poteaux',
					cross: 'cross',
					otb: 'otb',
				},
				polyline: {
					drop: 'drop',
					ofc_12: 'ofc_12',
					ofc_48: 'ofc_48',
					ofc_144: 'ofc_144',
					ofc_fig_8: 'ofc_fig_8',
				},
				polygon: {
					buildings: 'buildings',
					mdu: 'mdu',
				},
			},
			btiLayers: {
				point: {
					sc48: 'sc48',
					sc144: 'sc144',
					cross: 'cross',
				},
				polyline: {
					ofc_144: 'ofc_144',
					ofc_48: 'ofc_48',
					ofc_fig_8: 'ofc_fig_8',
				},
				polygon: {
					buildings: 'buildings',
				}
			},
			btsLayers: {
				point: {
					poteaux: 'poteaux',
					newPole: 'newPole',
					otb: 'otb',
				},
				polyline: {
					ofc_12: 'ofc_12',
					ofc_48: 'ofc_48',
					ofc_144: 'ofc_144',
					drop: 'drop',
				},
				polygon: {
					buildings: 'buildings',
					mdu: 'mdu',
				},
			}
		})
}());