(function(){
	angular.module('nameApp')
		.controller('mapCtrl', ['$http', 'leafletData', '$interval','$rootScope','$scope', '$window', '$routeParams', '$timeout', '$localStorage', 'apiUrl', 'baseFunc', 'dataService', function($http, leafletData, $interval, $rootScope, $scope, $window, $routeParams, $timeout, $localStorage, apiUrl, baseFunc, dataService){

		$scope.test = "Hello from main controller!";

			angular.extend($scope, {
				libreville: {
					lat: 0.504503980130774,
					lng: 9.408579986073635,
					zoom: 15
				},
				layers: {
					baselayers: {
						osm: {
							name: 'Layers:',
							url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
							type: 'xyz'
						},
					},
					overlays:{}
				}
			});

			dataService.getData('./GeoJSON/Z_1_DROP.geojson')
				.then(function (response) {
					$scope.itemList = response.data;
				}, function (error) {
					throw dataService.catchError(error,'Ajax call error massege!');
			});


			$http.get("./GeoJSON/Z_1_DROP.geojson")
				.success(function(data, status) {
				angular.extend($scope.layers.overlays, {
					lines: {
						name:'POLES',
						type: 'geoJSONShape',
						data: data,
						visible: true,
						layerOptions: {
							style: {
								color: 'red',
								fillColor: 'red',
								weight: 1.0,
								opacity: 0.6,
								fillOpacity: 0.2
							}
						}
					}
				});
			});

			$http.get("./GeoJSON/Z_1_Buildings.geojson")
				.success(function(data, status) {
				angular.extend($scope.layers.overlays, {
					buildings: {
						name:'buildings',
						type: 'geoJSONShape',
						data: data,
						visible: true,
						layerOptions: {
							style: {
								color: 'orange',
								fillColor: 'orange',
								weight: 1.0,
								opacity: 0.6,
								fillOpacity: 0.2
							}
						}
					}
				});
			});

	}]);
}());
