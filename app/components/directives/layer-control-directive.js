angular.module('vMapsApp')
	.directive('layerControl', ['$document','$window', '$compile', 'leafletData', 'rolesConfig',
	function($document, $window, $compile, leafletData, rolesConfig) {
		return {
			restrict: 'AE',
			scope: true,
			template: function(scope, element, attrs){
				var list = '';
				for (layer in rolesConfig.populationLayers) {
					var layerConfig = rolesConfig.populationJSON[layer];
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
			},
			link: function(scope, element, attrs){		
				scope.switchLayer = function(layerName){
					var layerConfig = rolesConfig.populationJSON[layerName];
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