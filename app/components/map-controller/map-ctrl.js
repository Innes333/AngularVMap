(function(){
	angular.module('vMapsApp')
		.controller('mapCtrl', ['$http',
			'$interval', 'leafletData','$rootScope', '$scope', '$window',
			'$routeParams', '$timeout', '$localStorage',
			'baseFunc', 'dataService', 'rolesConfig',
			function($http, $interval, leafletData, $rootScope,
			         $scope, $window, $routeParams, $timeout, $localStorage,
			         baseFunc, dataService, rolesConfig){
					
	        angular.extend($scope, {
				vmap: {
					lat: 0.504503980130774,
					lng: 9.408579986073635,
					zoom: 16,
				},
				defaults: {
					zoomAnimation: false,
					markerZoomAnimation: false,
					fadeAnimation: false
				},
				legend: {},
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
								pane: layer.pane,
								radius: layer.radius,
								fillColor: layer.fillColor,
							    color: layer.color,
								weight: layer.weight,
							    opacity: layer.opacity,
							    fillOpacity: layer.fillOpacity,
								pointerEvents: 'all',
								dashArray: layer.dashArray !== '' ? layer.dashArray : '',
								layerName,
							},

						};
					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error message!');
					});
			}

			var currentUser = $rootScope.appConfig.user.username,
			userLayersCount = 0;

			var getLayers = function(nameOfLayers, url) {				
				for (var layer in nameOfLayers) {
					addLayer(rolesConfig[url][layer], layer);
				}				
			};


			switch (currentUser) {
				case 'demo':
					$scope.vmap.lng = 2.385152;
					$scope.vmap.lat = 6.369213;
					getLayers(rolesConfig.demoLayers, 'demoJSON');
					userLayersCount = Object.keys(rolesConfig.demoLayers).length;
				break;
				case 'population':
					$scope.vmap.lat = 0.60393;
					$scope.vmap.lng = 9.650924;
					$scope.vmap.zoom = 9;
					$scope.legend = {
						position: 'bottomright',
						colors: [ '#1a9641', '#77c35c', '#9cbf5a', '#e2e250', '#fec981', '#f17c4a', '#b73d2b', '#830c0e' ],
						labels: [ '0 - 150', '150 - 500', '500 - 1000', '1000 - 2500', '2500 - 4000', '4000 - 6500', '6500 - 13000', '13000 - 80000' ]
					};
				getLayers(rolesConfig.populationLayers, 'populationJSON');
				userLayersCount = Object.keys(rolesConfig.populationLayers).length;
				break;
				case 'presidence':
					getLayers(rolesConfig.presidenceLayers, 'testGeoJSON');
					userLayersCount = Object.keys(rolesConfig.presidenceLayers).length;
				break;
				case 'bti':
					getLayers(rolesConfig.btiLayers, 'testGeoJSON');
					userLayersCount = Object.keys(rolesConfig.btiLayers).length;
				break;
				case 'bts':
					getLayers(rolesConfig.btsLayers, 'testGeoJSON');
					userLayersCount = Object.keys(rolesConfig.btsLayers).lengt;
				break;
				default:
					// $scope.vmap.lng = 2.385152;
					// $scope.vmap.lat = 6.369213;
					// getLayers(rolesConfig.demoLayers, 'demoJSON');
					// userLayersCount = Object.keys(rolesConfig.demoLayers).length;
					$scope.vmap.lat = 0.60393;
					$scope.vmap.lng = 9.650924;
					$scope.vmap.zoom = 9;
					$scope.legend = {
						position: 'bottomright',
						colors: [ '#1a9641', '#77c35c', '#9cbf5a', '#e2e250', '#fec981', '#f17c4a', '#b73d2b', '#830c0e' ],
						labels: [ '0 - 150', '150 - 500', '500 - 1000', '1000 - 2500', '2500 - 4000', '4000 - 6500', '6500 - 13000', '13000 - 80000' ]
					};
					getLayers(rolesConfig.populationLayers, 'populationJSON');
					userLayersCount = Object.keys(rolesConfig.populationLayers).length;
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
								poiLayers = L.featureGroup([baselayers.overlays.population,
									baselayers.overlays.departments, baselayers.overlays.province, baselayers.overlays.GSMsites
								]);

						};				
						
						$scope.controls.search = {
							layer: poiLayers,
							initial: false,
							propertyName: 'Search_id',
							hideMarkerOnCollapse: false,
							buildTip: function(text, val) {
								console.log(baselayers.overlays.GSMsites)
								var type = val.layer.feature.properties.Search_id;
								return '<a href="#">' + '<b>' + type + ' </b><span style = background-color:'+val.layer.options.fillColor+'>'+
								val.layer.options.layerName+'</span></a>';
							}
						}
					};
				});
			});

			// get current location by IP
			$scope.searchIP = function() {
				var url = "http://freegeoip.net/json/";
				$http.get(url).success(function(res) {
					$scope.vmap = {
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
