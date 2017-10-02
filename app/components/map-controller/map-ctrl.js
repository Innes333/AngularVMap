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
					lat: 0.504503980130774,
					lng: 9.408579986073635,
					zoom: 16,
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
		
			// addLayer
			var addLayer = function(layer, layerName) {
				var layerType = layer.type === 'poly' || layer.type === 'line' ?
					'geoJSONPolyline' : 'geoJSONSVGMarker';
				var overlayName = '<span class="check"><span class="checked"></span></span><span class="'
				 + layer.type + ' ' + layerName + '"></span>' + layer.name;

				dataService.getData(layer.url + '.geojson')
					.then(function (response) {
						$scope.layers.overlays[layerName] = {
							name: overlayName,
							type: layerType,
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
							    opacity: layer.opacity,
							    fillOpacity: 0.8,
								pointerEvents: 'all',
								layerName,
							},

						};
					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error message!');
					});
			}

			var currentUser = $rootScope.appConfig.user.username,
			userLayersCount = 0;

			var getLayers = function(nameOfLayers) {
				if (currentUser === 'demo') {
					for (var layer in nameOfLayers) {
						addLayer(apiUrl.demoJSON[layer], layer);
					}
				} else {
					for (var layer in nameOfLayers) {
						addLayer(apiUrl.testGeoJSON[layer], layer);
						console.log(layer);
					}
				}
			};


			switch (currentUser) {
				case 'demo':
					$scope.libreville.lng = 2.385152;
					$scope.libreville.lat = 6.369213;
					getLayers(layersForRoles.demoLayers);
					userLayersCount = Object.keys(layersForRoles.demoLayers).length;
				break;
				case 'presidence':
					getLayers(layersForRoles.presidenceLayers);
					userLayersCount = Object.keys(layersForRoles.presidenceLayers).length;
				break;
				case 'bti':
					getLayers(layersForRoles.btiLayers);
					userLayersCount = Object.keys(layersForRoles.btiLayers).length;
				break;
				case 'bts':
					getLayers(layersForRoles.btsLayers);
					userLayersCount = Object.keys(layersForRoles.btsLayers).lengt;
				break;
				default:
					$scope.libreville.lng = 2.385152;
					$scope.libreville.lat = 6.369213;
					getLayers(layersForRoles.demoLayers);
					userLayersCount = Object.keys(layersForRoles.demoLayers).length;
			};

			$scope.$watchCollection('layers.overlays', function(allArray) {
				leafletData.getLayers('map').then(function(baselayers) {

					if (Object.keys(allArray).length == userLayersCount) {					
						var poiLayers;
						switch (currentUser) {
							case 'demo':
								poiLayers = L.featureGroup([baselayers.overlays.roads,
									baselayers.overlays.hydro, baselayers.overlays.buildings,
									baselayers.overlays.railways,
									baselayers.overlays.nbn_metro_exist,
									baselayers.overlays.ofc_12, baselayers.overlays.ofc_48,
									baselayers.overlays.ofc_144, baselayers.overlays.otb,
									baselayers.overlays.sc48, baselayers.overlays.sc144
								]);
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
							break;
							case 'bts':
								poiLayers = L.featureGroup([baselayers.overlays.otb, baselayers.overlays.newPole,
									baselayers.overlays.poteaux,
									baselayers.overlays.ofc_12, baselayers.overlays.ofc_48, baselayers.overlays.ofc_144, 
									baselayers.overlays.buildings, baselayers.overlays.mdu
									]);
							break;								
							default:
								poiLayers = L.featureGroup([baselayers.overlays.roads,
									baselayers.overlays.hydro, baselayers.overlays.buildings,
									baselayers.overlays.railways]);

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
			var overlays = $scope.layers.baselayers;
			$scope.isActive = true;

			if (currentUser === 'demo') {
				if (overlays.hasOwnProperty('osm')) {
					delete overlays['osm'];
					$scope.isActive = false;
				}
			}
			$scope.toggleLayer = function(overlayName) {
                if (overlays.hasOwnProperty(overlayName)) {
                    delete overlays[overlayName];
                    $scope.isActive = !$scope.isActive;

                } else {
                    overlays[overlayName] = baseMapLayer;
                }
            };


	}]);
}());
