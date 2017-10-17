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
					var checkedClass = layerConfig.show ? 'checked' : 'unchecked';
					list +=
						'<div class="control-layers-selector">' + 
						'<span ng-click="switchLayer(' + "'" + layerConfig.className + "'" + 
						')" class="check"  ng-class="{' + "'active'" + ': !shown}">' +
						'<span class="checked"></span></span>' +
						'<span class="'	+ layerConfig.type + ' ' + layerConfig.className + '">'  + layerConfig.name +
						'</div>';		
				}
				return list;			
			},
			link: function(scope, element, attrs){		
				scope.switchLayer = function(layerName){
					scope.$parent.shown = !scope.$parent.shown;
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
				console.log(scope);							

			}
		}
	}
]);