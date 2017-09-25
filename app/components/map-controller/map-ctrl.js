(function(){
	angular.module('vMapsApp')
		.controller('mapCtrl', ['$http',
			'$interval', 'leafletData','$rootScope', '$scope', '$window',
			'$routeParams', '$timeout', '$localStorage', 'apiUrl',
			'baseFunc', 'dataService', 'layersForRoles',
			function($http, $interval, leafletData, $rootScope,
			         $scope, $window, $routeParams, $timeout, $localStorage,
			         apiUrl, baseFunc, dataService, layersForRoles){


	        angular.extend($scope, {
				libreville: {
					lng: 2.385152,
					lat: 6.369213,
					// lat: 0.504503980130774,
					// lng: 9.408579986073635,
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
					sortLayers: false,
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
								sortLayers: false,
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
						throw dataService.catchError(error, 'Ajax call error message!');
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
								pane: 'markerPane',
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
						throw dataService.catchError(error, 'Ajax call error message!');
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
								pane: 'markerPane',
								radius: layer.radius,
								fillColor: layer.bgc,
							    color: layer.color,
								weight: layer.weight,
								lineCap: 'square',
							    opacity: layer.opacity,
							    fillOpacity: 0.8,
								setZIndex: layer.zIndex,
								pointerEvents: 'all',
								layerName,
							},

						};
					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error message!');
					});
			}

			var getLayres = function(typeOfLayer) {
				
				for (var pointLayer in typeOfLayer.point) {
					addPointLayer(apiUrl.pointGeoJSON[pointLayer], pointLayer);
				}
			
				// Add polyline layers
				for (var polylineLayer in typeOfLayer.polyline) {
					addPolylineLayer(apiUrl.polylineGeoJSON[polylineLayer], polylineLayer);
				}
				// Add shape layers
				for (var polygonLayer in typeOfLayer.polygon) {
					addPolyLayer(apiUrl.polyGeoJSON[polygonLayer], polygonLayer);
				}
			};


			var currentUser = $rootScope.appConfig.user.username,
				userLayersCount = 0; 

			switch (currentUser) {
				case 'admin':
					getLayres(layersForRoles.adminLayers);
					userLayersCount = Object.keys(layersForRoles.adminLayers.point).length +
						Object.keys(layersForRoles.adminLayers.polyline).length +
						Object.keys(layersForRoles.adminLayers.polygon).length;
				break;
				case 'presidence':
					getLayres(layersForRoles.presidenceLayers);
					userLayersCount = Object.keys(layersForRoles.presidenceLayers.point).length +
						Object.keys(layersForRoles.presidenceLayers.polyline).length +
						Object.keys(layersForRoles.presidenceLayers.polygon).length;
				break;
				case 'bti':
					getLayres(layersForRoles.btiLayers);
					userLayersCount = Object.keys(layersForRoles.btiLayers.point).length +
						Object.keys(layersForRoles.btiLayers.polyline).length +
						Object.keys(layersForRoles.btiLayers.polygon).length;
				break;
				case 'bts':
					getLayres(layersForRoles.btsLayers);
					userLayersCount = Object.keys(layersForRoles.btsLayers.point).length+
						Object.keys(layersForRoles.btsLayers.polyline).length +
						Object.keys(layersForRoles.btsLayers.polygon).length;
				break;
				default:
					getLayres(layersForRoles.adminLayers);
					userLayersCount = Object.keys(layersForRoles.adminLayers.point).length +
						Object.keys(layersForRoles.adminLayers.polyline).length +
						Object.keys(layersForRoles.adminLayers.polygon).length;
			};

			$scope.$watchCollection('layers.overlays', function(allArray) {
				leafletData.getLayers('map').then(function(baselayers) {

					if (Object.keys(allArray).length == userLayersCount) {					
						var poiLayers;
						switch (currentUser) {
							case 'admin':
								poiLayers = L.featureGroup([baselayers.overlays.cross, baselayers.overlays.otb, baselayers.overlays.newPole,
									baselayers.overlays.poteaux, baselayers.overlays.sc48, baselayers.overlays.sc144,
									baselayers.overlays.drop, baselayers.overlays.ofc_12, baselayers.overlays.ofc_48, baselayers.overlays.ofc_144,
									baselayers.overlays.ofc_fig_8, baselayers.overlays.buildings, baselayers.overlays.mdu]);
							break;
							case 'presidence':
								poiLayers = L.featureGroup([baselayers.overlays.cross, baselayers.overlays.mdu,
									baselayers.overlays.otb, baselayers.overlays.newPole,
									baselayers.overlays.poteaux,
									baselayers.overlays.sc48, baselayers.overlays.sc144, baselayers.overlays.drop,
									baselayers.overlays.ofc_12, baselayers.overlays.ofc_48, baselayers.overlays.ofc_144,
									baselayers.overlays.ofc_fig_8, baselayers.overlays.buildings, baselayers.overlays.mdu]);
							break;
							case 'bti':
								poiLayers = L.featureGroup([baselayers.overlays.cross, 
									baselayers.overlays.sc48, baselayers.overlays.sc144,
									baselayers.overlays.ofc_144, baselayers.overlays.ofc_48,
									baselayers.overlays.ofc_fig_8, baselayers.overlays.buildings]);
								console.log(poiLayers);
							break;
							case 'bts':
								poiLayers = L.featureGroup([baselayers.overlays.otb, baselayers.overlays.newPole,
									baselayers.overlays.poteaux,
									baselayers.overlays.ofc_12, baselayers.overlays.ofc_48, baselayers.overlays.ofc_144, 
									baselayers.overlays.buildings, baselayers.overlays.mdu
									]);
							break;								
							default:
								poiLayers = L.featureGroup([baselayers.overlays.cross,
									baselayers.overlays.otb, baselayers.overlays.newPole,
									baselayers.overlays.poteaux,
									baselayers.overlays.sc48, baselayers.overlays.sc144]);
						};				
						
						$scope.controls.search = {
							layer: poiLayers,
							initial: false,
							propertyName: 'Search_id',
							hideMarkerOnCollapse: false,
							buildTip: function(text, val) {
								var type = val.layer.feature.properties.Search_id;
								return '<a href="#">' + '<b>' + type + ' </b><span style = background-color:'+val.layer.options.fillColor+'>'+val.layer.options.layerName+'</span></a>';
							}
						}
					};
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

			// Toggle map baselayer visibility 
			var baseMapLayer = $scope.layers.baselayers.osm;
			$scope.toggleLayer = function(overlayName) {

                var overlays = $scope.layers.baselayers
                $scope.isActive = false;
                if (overlays.hasOwnProperty(overlayName)) {
                    delete overlays[overlayName];
                    $scope.isActive = !$scope.isActive;

                } else {
                    overlays[overlayName] = baseMapLayer;
                }
            };


	}]);
}());
