(function(){
	angular.module('nameApp')
		.controller('mapCtrl', ['$http',
			'leafletData', '$interval',	'$rootScope', '$scope', '$window', '$routeParams',
			'$timeout', '$localStorage', 'apiUrl', 	'baseFunc', 'dataService',
			function($http, leafletData, $interval, $rootScope,
			         $scope, $window, $routeParams, $timeout, $localStorage, apiUrl, baseFunc, dataService){

			angular.extend($scope, {
				libreville: {
					lat: 0.504503980130774,
					lng: 9.408579986073635,
					zoom: 15,
				},
				defaults: {
					zoomAnimation: false,
					markerZoomAnimation: false,
					fadeAnimation: false
				},
				controls: {
					scale:{},
					search: {},
					custom: new L.Control.Measure({
						primaryLengthUnit: 'meters',
						secondaryLengthUnit: 'kilometers',
						primaryAreaUnit: 'sqmeters',
						secondaryAreaUnit: 'hectares'
					}),
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
								showOnSelector: true
							}
						}
					},
					overlays: {},
				},

			});

			// get poly objects
			angular.forEach(apiUrl.polyGeoJSON, function(layer, key) {
				var layerName = layer.name;
				dataService.getData(layer.url + '.geojson')
					.then(function (response) {
						$scope.layers.overlays[layerName] = {
								name: layerName + '<img src="../../assets/img/' + layer.img + '">',
								type: 'geoJSONShape',
								data: response.data,
								visible: true,
								layerOptions: {
									className: layer.className,
									style: {
										color: layer.color,
										fillColor: layer.bgc,
										weight: layer.weight,
										opacity: layer.opacity,
										fillOpacity: layer.fillOpacity,
										zIndex: 100,
									},
								},

						};

					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error massege!');
					});
			});


			//get point objects
			angular.forEach(apiUrl.pointGeoJSON, function(layer) {
				var layerName = layer.name;
				dataService.getData(layer.url + '.geojson')
					.then(function (response) {
						$scope.layers.overlays[layerName] = {
							name: layerName + '<img src="../../assets/img/' + layer.img + '">',
							type: 'geoJSONAwesomeMarker',
							data: response.data,
							visible: true,
							clickable: true,
							icon: {
								iconSize: [8, 8],
								popupAnchor: [1, 5],
								shadowSize: [0, 0],
								className: 'awesome-marker ' + layerName.toLowerCase(),
								iconColor: 'white'
							},
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


			// get current location by IP
			$scope.searchIP = function() {
				var url = "http://freegeoip.net/json/";
				$http.get(url).success(function(res) {
					$scope.libreville = {
						lat: res.latitude,
						lng: res.longitude,
						zoom: 10
					};
					$scope.ip = res.ip;
				});
			};


	}]);
}());
