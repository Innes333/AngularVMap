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
					})
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
					overlays: {}
				}
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
								layerName: layerName,
								zIndex: 100,
								popupColumns: layer.popupColumns
							}
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
					$scope.vmap.lng = 1.240906;
					$scope.vmap.lat = 6.130398;
					userLayersCount = Object.keys(rolesConfig.demoLayers).length;
					getLayers(rolesConfig.demoLayers, 'demoJSON', userLayersCount);
					$scope.userLayers = rolesConfig.demoLayers;
					$scope.userLayersConfig = rolesConfig.demoJSON;
				break;							
				default:
					$scope.vmap.lng = 1.240906;
					$scope.vmap.lat = 6.130398;
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

			// if (currentUser === 'demo') {
			// 	if (overlays.hasOwnProperty('osm')) {
			// 		delete overlays['osm'];
			// 		$scope.isActive = false;
			// 	}
			// }

			$scope.toggleLayer = function(overlayName) {
                if (overlays.hasOwnProperty(overlayName)) {
                    delete overlays[overlayName];
                    $scope.isActive = !$scope.isActive;

                } else {
                    overlays[overlayName] = baseMapLayer;
                }
			};
			
			// changee city location
			$scope.cityOptions = ['Lome', 'Tabligbo', 'Kara'];
  
			$scope.selectedCityChanged = function(){
				var cityLoc = rolesConfig.cityLocation[$scope.selectedCity];
				$scope.vmap.lng = cityLoc.lng;
				$scope.vmap.lat = cityLoc.lat;
			}


	}]);
}());
