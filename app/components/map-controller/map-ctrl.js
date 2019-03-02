(function(){
	angular.module('vMapsApp')
		.controller('mapCtrl', ['$http',
			'$interval', 'leafletData', '$rootScope', '$scope', '$window',
			'$routeParams', '$timeout', '$localStorage',
			'baseFunc', 'dataService', 'rolesConfig',
			function($http, $interval, leafletData, $rootScope,
			         $scope, $window, $routeParams, $timeout, $localStorage,
			         baseFunc, dataService, rolesConfig){
									
	        angular.extend($scope, {
				vmap: {
					lat: 0.504503980130774,
					lng: 9.408579986073635,
					zoom: 18,
					preferCanvas: true,
					renderer: L.canvas()				
				},
				defaults: {
					zoomAnimation: true,
					markerZoomAnimation: false,
					fadeAnimation: true,
					preferCanvas: true,
					renderer: L.canvas()
				},
				controls: {
					custom: new L.Control.Measure({
						primaryLengthUnit: 'meters',
						secondaryLengthUnit: 'kilometers',
						primaryAreaUnit: 'sqmeters',
						secondaryAreaUnit: 'hectares'
					})
				},
				preferCanvas: true,
				renderer: L.canvas(),
				layers: {
					renderer: L.canvas(),
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
								maxZoom: 25,
								preferCanvas: true
	                        }
	                    }
					},
					overlays: {}
				}
			});

			var getBboxUrl = function(url, bbox) {
				return url + `?lat1=${bbox[0]}&lng1=${bbox[1]}`
					+ `&lat2=${bbox[2]}&lng2=${bbox[3]}`;
			}
	        // get map object from $scope
			var map = leafletData.getMap('map');
			var bbox = null;
			// bind to onDragEnd event
			map.then(function(map) {				
				bbox = map.getBounds().toBBoxString().split(',');
				loadLayers($scope.userLayers, 'demoJSON', $scope.userLayersConfig.loadFirst, bbox);
				
				map.on('dragend', function() {
					bbox = map.getBounds().toBBoxString().split(',');
					console.log('drag ', getBboxUrl('localhost:30303/', bbox));
					loadLayers($scope.userLayers, 'demoJSON', $scope.userLayersConfig.loadFirst, bbox);
				});
			})
		  
			// addLayer
			$scope.addLayer = function(layer, layerName, bbox) {
				$rootScope.appConfig.preloader = true;
				var layerType = layer.type === 'poly' || layer.type === 'line' ?
					'geoJSONPolyline' : 'geoJSONSVGMarker';
				var overlayName = '<span class="check"><span class="checked"></span></span><span class="'
				 + layer.type + ' ' + layerName + '"></span>' + layer.name;
				var bboxUrl = getBboxUrl(layer.url, bbox);
				// console.log('bbox  ', getBboxUrl(layer.url, bbox));
				dataService.getData(bboxUrl)
					.then(function (response) {
						var features = response.data;
						if (!response.data.features) {
							features = [{"type":"Feature","geometry":{"type":"LineString","coordinates":[]}}]
						}
						console.log('first loD ', $scope.layers.overlays[layerName]);
						$scope.layers.overlays[layerName] = {
							name: overlayName,
							type: layerType,
							renderer: L.canvas(),
							data: features,
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
								popupColumns: layer.popupColumns,
								schema: layer.schema
							}
						};
						console.log($scope.layers.overlays[layerName]);
						$rootScope.appConfig.preloader = false;
					}, function (error) {
						throw dataService.catchError(error, 'Something goes wrong with server!');
					});
			};

			var currentUser = $rootScope.appConfig.user.username,
				userLayersCount = 0,
				loadFirstCount = 0;

			var loadLayers = function(nameOfLayers, url, loadFirst, bbox) {
				for (var layer in nameOfLayers) {
					loadFirst.includes(layer) && bbox && $scope.addLayer(rolesConfig[url][layer], layer, bbox);					
				}					
			};

			switch (currentUser) {
				case 'demo':
					$scope.vmap.lng = 1.240906;
					$scope.vmap.lat = 6.130398;
					userLayersCount = Object.keys(rolesConfig.demoLayers).length;
					loadFirstCount = rolesConfig.demoJSON.loadFirst.length;					
					loadLayers(rolesConfig.demoLayers, 'demoJSON', rolesConfig.demoJSON.loadFirst );
					$scope.userLayers = rolesConfig.demoLayers;
					$scope.userLayersConfig = rolesConfig.demoJSON;
				break;							
				default:
					$scope.vmap.lng = 1.240906;
					$scope.vmap.lat = 6.130398;
					userLayersCount = Object.keys(rolesConfig.demoLayers).length;
					loadFirstCount = rolesConfig.demoJSON.loadFirst.length;
					$scope.userLayers = rolesConfig.demoLayers;
					$scope.userLayersConfig = rolesConfig.demoJSON;
					console.log('cse bbox ', bbox);
					
			};

			// $scope.$watchCollection('layers.overlays', function(allArray) {
			// 	leafletData.getLayers('map').then(function(baselayers) {
			// 		// check if all layers are loaded
			// 		if (Object.keys(allArray).length === loadFirstCount || Object.keys(allArray).length === userLayersCount ) {
			// 			$rootScope.appConfig.preloader = false;
			// 			// move to front a layer										
			// 			// if ($scope.userLayersConfig.topLayers) {
			// 			// 	for (var i=0; i < $scope.userLayersConfig.topLayers.length; i++) {
			// 			// 		baselayers.overlays[$scope.userLayersConfig.topLayers[i]].bringToFront();
			// 			// 	}
			// 			// }							
						
			// 			var poiLayers;
			// 			// Prepare array of overlay layers
			// 			var layerArray = [];
			// 			for (overlay in baselayers.overlays) {
			// 				layerArray.push(baselayers.overlays[overlay]);
			// 			}
					
			// 			poiLayers = L.featureGroup(layerArray);				
						
			// 			$scope.controls.search = {
			// 				layer: poiLayers,
			// 				initial: false,
			// 				propertyName: 'search_id',
			// 				hideMarkerOnCollapse: false,
			// 				buildTip: function(text, val) {
			// 					var type = val.layer.feature.properties.search_id;
			// 					return '<a href="#">' + '<b>' + type + ' </b><span style = background-color:'+val.layer.options.fillColor+'>'+
			// 					val.layer.options.layerName+'</span></a>';
			// 				}
			// 			}
						
			// 		};
			// 	});
			// });

			// console.log(leafletData.getMap('map'))
			// window.onsubmit = function(e) {
			// 	e.preventDefault();
			// 	// window.data = e;
			// 	var formData = angular(e.target);
			// 	console.log('submit', formData);
			// };

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
