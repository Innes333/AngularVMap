angular.module('vMapsApp')
	.directive('layerControl', ['$document','$window', '$compile', 'leafletData', 'rolesConfig',
	function($document, $window, $compile, leafletData, rolesConfig, $rootScope) {
		return {
			restrict: 'AE',
			scope: true,			
			link: function(scope, element, attrs){	
				var userLayers = scope.$parent.userLayers,
					userLayersConfig = scope.$parent.userLayersConfig;

				var renderHmtl = function() {
					var list = '';				
					for (layer in userLayers) {
						var layerConfig = userLayersConfig[layer];
						list +=
							'<div class="control-layers-selector">' +
							'<input checked ng-click="switchLayer(' + "'" + layerConfig.className + "'" +
							')" id="' + layerConfig.className + '" type="checkbox">' +
							'<label for="' + layerConfig.className + '">' +
							'<span class="'	+ layerConfig.type + ' ' + layerConfig.className + '"></span>' +
							layerConfig.name + '</label>' +
							'</div>';
					}
					return list;	
				}

				element.append($compile(renderHmtl())(scope));

				scope.switchLayer = function(layerName){
					var layerConfig = userLayersConfig[layerName];
					leafletData.getLayers('map').then(function(baselayers) {
						baselayers.overlays[layerName].eachLayer(function (layer) { 
							if (layer.options.opacity === 0) {
								layer.setStyle({
									fillOpacity : layerConfig.fillOpacity,
									opacity: layerConfig.opacity,
								}) 
							} else {
								layer.setStyle({
									fillOpacity : 0,
									opacity: 0,
								})
							}

						});			
					})							
				};

			}
		}
	}
]);