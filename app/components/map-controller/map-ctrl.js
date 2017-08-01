(function(){
	angular.module('nameApp')
		.controller('mapCtrl', ['$http',
			'$interval', 'leafletData','$rootScope', '$scope', '$window', '$routeParams',
			'$timeout', '$localStorage', 'apiUrl', 	'baseFunc', 'dataService',
			function($http, $interval, leafletData, $rootScope,
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
					sortLayers: true,
					baselayers: {
						 osm: {
	                        name: 'Layers',
	                        type: 'xyz',
	                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	                        layerOptions: {
	                            subdomains: ['a', 'b', 'c'],
	                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	                            continuousWorld: true,
	                            showOnSelector: true,
	                            minZoom: 15,
   								maxZoom: 25
	                        }
	                    }
					},
					overlays: {},
				},

			});


			// get poly objects
			var addPolyLayer = function(layer, layerName) {
				dataService.getData(layer.url + '.geojson')
					.then(function (response) {
						$scope.layers.overlays[layerName] = {
								name: '<span class="check"><span class="checked"></span></span><span class="square ' + layerName + '"></span>' + layer.name,
								type: 'geoJSONShape',
								data: response.data,
								visible: true,
								setZIndex: layer.zIndex,
								sortLayers: true,
								layerOptions: {
									className: layer.className,
									style: {
										color: layer.color,
										fillColor: layer.bgc,
										weight: layer.weight,
										opacity: layer.opacity,
										fillOpacity: layer.fillOpacity,
									},
								},

						};

					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error massege!');
					});
			};


			var addPointLayer = function(layer, layerName) {
				dataService.getData(layer.url + '.geojson')
					.then(function (response) {
						$scope.layers.overlays[layerName] = {
							name: '<span class="check"><span class="checked"></span></span><span class="circle ' + layerName + '"></span>' + layer.name,
							type: 'geoJSONSVGMarker',
							data: response.data,
							visible: true,
							clickable: true,
							setZIndex: layer.zIndex,
							layerOptions: {
								radius: layer.radius,
								fillColor: layer.bgc,
							    color: layer.color,
								weight: 1,
							    opacity: layer.opacity,
							    fillOpacity: 0.8,
								setZIndex: layer.zIndex,
								pointerEvents: 'all',
							},

						};
					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error massege!');
					});
			}
			//
			var addPolylineLayer = function(layer, layerName) {
				dataService.getData(layer.url + '.geojson')
					.then(function (response) {
						$scope.layers.overlays[layerName] = {
							name: '<span class="check"><span class="checked"></span></span><span class="line ' + layerName + '"></span>' + layer.name,
							type: 'geoJSONPolyline',
							data: response.data,
							visible: true,
							clickable: true,
							setZIndex: layer.zIndex,
							layerOptions: {
								radius: layer.radius,
								fillColor: layer.bgc,
							    color: layer.color,
								weight: layer.weight,
							    opacity: layer.opacity,
							    fillOpacity: 0.8,
								setZIndex: layer.zIndex,
								pointerEvents: 'all',
							},

						};
					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error massege!');
					});
			}

			// Add point layers
			addPointLayer(apiUrl.pointGeoJSON.sc48, 'sc-48');
			addPointLayer(apiUrl.pointGeoJSON.sc144, 'sc-144');
			addPointLayer(apiUrl.pointGeoJSON.newPole, 'newPole');
			addPointLayer(apiUrl.pointGeoJSON.poteaux, 'poteaux');
			addPointLayer(apiUrl.pointGeoJSON.cross, 'cross');
			addPointLayer(apiUrl.pointGeoJSON.otb, 'otb');

			// Add polyline layers
			addPolylineLayer(apiUrl.polylineGeoJSON.drop, 'drop');
			addPolylineLayer(apiUrl.polylineGeoJSON.ofc_12, 'ofc_12');
			addPolylineLayer(apiUrl.polylineGeoJSON.ofc_48, 'ofc_48');
			addPolylineLayer(apiUrl.polylineGeoJSON.ofc_144, 'ofc_144');
			addPolylineLayer(apiUrl.polylineGeoJSON.ofc_fig_8, 'ofc_fig_8');
			// Add shape layers

			addPolyLayer(apiUrl.polyGeoJSON.buildings, 'buildings');
			addPolyLayer(apiUrl.polyGeoJSON.mdu, 'mdu');



			leafletData.getLayers().then(function(baselayers) {
				angular.extend($scope.controls, {
					search: {
						propertyName: 'BuildingID',
						marker: false,
						layer: baselayers.overlays.drop,
						moveToLocation: function (latlng, title, map) {
							map.fitBounds( latlng.layer.getBounds() );
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
