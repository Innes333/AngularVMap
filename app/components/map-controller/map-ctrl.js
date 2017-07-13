(function(){
	angular.module('nameApp')
		.controller('mapCtrl', ['$http', 'leafletData', '$interval','$rootScope','$scope', '$window', '$routeParams', '$timeout', '$localStorage', 'apiUrl', 'baseFunc', 'dataService', function($http, leafletData, $interval, $rootScope, $scope, $window, $routeParams, $timeout, $localStorage, apiUrl, baseFunc, dataService){

			angular.extend($scope, {
				libreville: {
					lat: 0.504503980130774,
					lng: 9.408579986073635,
					zoom: 15
				},
				controls: {
					scale:{},
					search: {}
				},
				layers: {
					baselayers: {
						osm: {
							name: 'Layers:',
							url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
							type: 'xyz',
							layerOptions: {
								mapid: 'lf-map'
							},
							layerParams: {
								showOnSelector: false
							}
						}
					},
					overlays: {},
				},
			});

			angular.forEach(apiUrl.layersGeoJSON, function(layer, key) {
				var layerName = layer.name;
				dataService.getData(layer.url + '.geojson')
					.then(function (response) {
						$scope.layers.overlays[layerName] = {
								name: layerName,
								type: 'geoJSONShape',
								data: response.data,
								visible: true,
								layerOptions: {
									style: {
										color: layer.color,
										fillColor: layer.bgc,
										fillOpacity: 0.6,
										weight: 3,
										radius: 6,
										clickable: true
									},
								}
						};

					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error massege!');
					});
			});

			leafletData.getLayers().then(function(baselayers) {
				angular.extend($scope.controls, {
					search: {
						propertyName: 'BuildingID',
						marker: false,
						layer: baselayers.overlays.drop,
						moveToLocation: function (latlng, title, map) {
							//map.fitBounds( latlng.layer.getBounds() );
							var zoom = map.getBoundsZoom(latlng.layer.getBounds());
							map.setView(latlng, zoom); // access the zoom
						}
					}
				});
			});

	}]);
}());
