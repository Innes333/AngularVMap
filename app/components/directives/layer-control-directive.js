angular.module('vMapsApp')
	.directive('layerControl', ['$document','$window', '$compile', 'leafletData', 'rolesConfig',
	function($document, $window, $compile, leafletData, rolesConfig, $rootScope) {
		return {
			restrict: 'AE',
			scope: true,			
			link: function(scope, element, attrs){	
				var layers = scope.$parent.userLayers,
					userLayersConfig = scope.$parent.userLayersConfig;
				scope.checked = true;

				var createCheckbox = function (config, category) {
					return '<div class="control-layers-selector">' +
						'<input ng-checked="'+ category + '" checked ng-click="switchLayer(' + "'" + config.className + "'" +
						')" id="' + config.className + '" type="checkbox">' +
						'<label for="' + config.className + '">' +
						'<span class="'	+ config.type + ' ' + config.className + '"></span>' +
						config.name + '</label>' +
						'</div>';
				};

				var switcher = function (baseLayers, layerName) {
					baseLayers.overlays[layerName].eachLayer(function (layer) {
						if (layer.options.opacity === 0) {
							layer.setStyle({
								fillOpacity : userLayersConfig[layerName].fillOpacity,
								opacity: userLayersConfig[layerName].opacity
							})
						} else {
							layer.setStyle({
								fillOpacity : 0,
								opacity: 0
							})
						}
					});
				};

				var renderHmtl = function() {
					var list = '';
					var categoryList = '';
					var layersArray = {};
					for (layer in layers) {
						var category = userLayersConfig[layer].category;
						if(category && layersArray.hasOwnProperty(category)) {
							layersArray[category].push(layer);
						} else if(category && !layersArray.hasOwnProperty(category)) {
							layersArray[category] = [layer];
						}
						else {
							layersArray[layer] = layer;
						}
					}
					for (layer in layersArray) {
						if (typeof layersArray[layer] === 'string') {
							var layerConfig = userLayersConfig[layer];
							list += createCheckbox(layerConfig, 'checked');
						} else {
							var checkboxes = '';
							scope[layer] = true;
							layersArray[layer].map(function(item) {
								var layerConfig = userLayersConfig[item];
								checkboxes += createCheckbox(layerConfig, layer);
							});

							list +=
								'<div class="control-layers-selector category">' +
								'<input checked ng-click="switchLayer('+ "'" + layersArray[layer] + "'" +
								'); ' + layer + '=!' + layer + '" id="' + layer + '" type="checkbox">' +
								'<label class="category-label" for="' + layer + '">' +
								layer + '</label>' +
								'<div>' + checkboxes +
								'</div>' +
								'</div>';
						}

					}
					list += categoryList;
					return list;
				};

				element.append($compile(renderHmtl())(scope));

				scope.switchLayer = function(layers) {
					var categories = layers.split(',');
					leafletData.getLayers('map').then(function(baselayers) {
						if (categories.length >= 2) {
							categories.forEach(function(category) {
								switcher(baselayers, category);
							})
						} else {
							switcher(baselayers, layers);
						}
					})
				};

			}
		}
	}
]);