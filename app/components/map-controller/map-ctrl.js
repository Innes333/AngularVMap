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
					zoom: 16
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
					sortFunction: function() {},
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
							autoZIndex: false,
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
								zIndex: 100,
								popupColumns: layer.popupColumns
							},

						};
					}, function (error) {
						throw dataService.catchError(error, 'Ajax call error message!');
					});
			};

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
					userLayersCount = Object.keys(rolesConfig.demoLayers).length;
					getLayers(rolesConfig.demoLayers, 'demoJSON', userLayersCount);
					$scope.userLayers = rolesConfig.demoLayers;
					$scope.userLayersConfig = rolesConfig.demoJSON;
				break;
				case 'Gabon':
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
					$scope.userLayers = rolesConfig.populationLayers;
					$scope.userLayersConfig = rolesConfig.populationJSON;
				break;
				case 'presidence':
					getLayers(rolesConfig.presidenceLayers, 'testGeoJSON');
					userLayersCount = Object.keys(rolesConfig.presidenceLayers).length;
					$scope.userLayers = rolesConfig.presidenceLayers;
					$scope.userLayersConfig = rolesConfig.testGeoJSON;
				break;
				case 'bti':
					getLayers(rolesConfig.btiLayers, 'testGeoJSON');
					userLayersCount = Object.keys(rolesConfig.btiLayers).length;
					$scope.userLayers = rolesConfig.btiLayers;
					$scope.userLayersConfig = rolesConfig.testGeoJSON;
				break;
				case 'bts':
					getLayers(rolesConfig.btsLayers, 'testGeoJSON');
					userLayersCount = Object.keys(rolesConfig.btsLayers).lengt;
					$scope.userLayers = rolesConfig.btsLayers;
					$scope.userLayersConfig = rolesConfig.testGeoJSON;
				break;
				default:					
					$scope.vmap.lng = 2.385152;
					$scope.vmap.lat = 6.369213;
					userLayersCount = Object.keys(rolesConfig.demoLayers).length;
					getLayers(rolesConfig.demoLayers, 'demoJSON', userLayersCount);
					$scope.userLayers = rolesConfig.demoLayers;
					$scope.userLayersConfig = rolesConfig.demoJSON;
			};

			$scope.$watchCollection('layers.overlays', function(allArray) {
				leafletData.getLayers('map').then(function(baselayers) {
					// check if all layers are loaded
					if (Object.keys(allArray).length === userLayersCount) {
						// move to front a layer										
						if ($scope.userLayersConfig.topLayers) {
							for (var i=0; i < $scope.userLayersConfig.topLayers.length; i++) {
								baselayers.overlays[$scope.userLayersConfig.topLayers[i]].bringToFront();
							}
						}							
						
						var poiLayers;
						// Prepare array of overlay layers
						var layerArray = [];
						for (overlay in baselayers.overlays) {
							layerArray.push(baselayers.overlays[overlay]);
						}
					
						poiLayers = L.featureGroup(layerArray);				
						
						$scope.controls.search = {
							layer: poiLayers,
							initial: false,
							propertyName: 'search_id',
							hideMarkerOnCollapse: false,
							buildTip: function(text, val) {
								var type = val.layer.feature.properties.search_id;
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
