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

	        // get map object from $scope
	        var map = leafletData.getMap('map');

			// addPolyLayer
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
									layerName,
								},

						};

					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error massege!');
					});
			};

			// addPointLayer
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
								layerName,
							},

						};
					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error massege!');
					});
			}
			// addPolylineLayer
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
								layerName,
							},

						};
					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error massege!');
					});
			}

			var adminLayers = {
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
				}
			};

			var presidenceLayers = {
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
				}
			};

			var btiLayers = {
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
			};

			var btsLayers = {
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
				}
			};


			switch ($rootScope.appConfig.user.username) {
				case 'admin': {
						// Add point layers
						for (var pointLayer in adminLayers.point) {
							addPointLayer(apiUrl.pointGeoJSON[pointLayer], pointLayer);
						}
						// Add polyline layers
						for (var polylineLayer in adminLayers.polyline) {
							addPolylineLayer(apiUrl.polylineGeoJSON[polylineLayer], polylineLayer);
						}
						// Add shape layers
						for (var polygonLayer in adminLayers.polygon) {
							addPolyLayer(apiUrl.polyGeoJSON[polygonLayer], polygonLayer);
						}
					}
				break;
				case 'presidence': {
						// Add point layers
						for (var pointLayer in presidenceLayers.point) {
							addPointLayer(apiUrl.pointGeoJSON[pointLayer], pointLayer);
						}
						// Add polyline layers
						for (var polylineLayer in presidenceLayers.polyline) {
							addPolylineLayer(apiUrl.polylineGeoJSON[polylineLayer], polylineLayer);
						}
						// Add shape layers
						for (var polygonLayer in presidenceLayers.polygon) {
							addPolyLayer(apiUrl.polyGeoJSON[polygonLayer], polygonLayer);
						}
					}
				break;
				case 'bti': {
						// Add point layers
						for (var pointLayer in btiLayers.point) {
							addPointLayer(apiUrl.pointGeoJSON[pointLayer], pointLayer);
						}
						// Add polyline layers
						for (var polylineLayer in btiLayers.polyline) {
							addPolylineLayer(apiUrl.polylineGeoJSON[polylineLayer], polylineLayer);
						}
						// Add shape layers
						for (var polygonLayer in btiLayers.polygon) {
							addPolyLayer(apiUrl.polyGeoJSON[polygonLayer], polygonLayer);
						}
					}
				break;
				case 'bts': {
						// Add point layers
						for (var pointLayer in btsLayers.point) {
							addPointLayer(apiUrl.pointGeoJSON[pointLayer], pointLayer);
						}
						// Add polyline layers
						for (var polylineLayer in btsLayers.polyline) {
							addPolylineLayer(apiUrl.polylineGeoJSON[polylineLayer], polylineLayer);
						}
						// Add shape layers
						for (var polygonLayer in btsLayers.polygon) {
							addPolyLayer(apiUrl.polyGeoJSON[polygonLayer], polygonLayer);
						}
					}
				break;
				default: {
						// Add shape layers
						for (var polygonLayer in adminLayers.polygon) {
							addPolyLayer(apiUrl.polyGeoJSON[polygonLayer], polygonLayer);
						}
					}
			}

			$scope.$watch('layers.overlays.poteaux', function() {
				leafletData.getLayers('map').then(function(baselayers) {
					if (baselayers.overlays.poteaux != undefined) {
						$scope.controls.search = {
							layer: baselayers.overlays.poteaux,
							initial: false,
							propertyName: 'Location_ID',
							hideMarkerOnCollapse: false,
							buildTip: function(text, val) {
								var type = val.layer.feature.properties.Location_ID;
								return '<a href="#">' + '<b>' + type + ' </b><span>poteaux</span></a>';
							}
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
