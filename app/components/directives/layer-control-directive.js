angular.module('vMapsApp')
	.directive('layerControl', ['$document','$window', '$compile', 'leafletData', 'rolesConfig',
	function($document, $window, $compile, leafletData, rolesConfig, $rootScope) {
		var zIndex = 210;
		return {
			restrict: 'AE',
			scope: true,			
			link: function(scope, element, attrs){	
				var layers = scope.$parent.userLayers,
					userLayersConfig = scope.$parent.userLayersConfig,
					addLayer = scope.$parent.addLayer;
				scope.checked = true,
				loadFirstL = userLayersConfig.loadFirst.length,
				scope.edit = userLayersConfig.loadFirst[loadFirstL - 1];
				console.log(userLayersConfig);

				var createCheckbox = function (config, category) {
						
					var multiColorLayerFunc = function() {
						var result = '';
						var renderItems = function(colors) {
							var items = '';
							for (var color in colors) {					
								items +='<li class="l-sub-name"><span class="l-name-sub-color" style="background:' +
								colors[color] + '"></span>' + color + '</li>';							    
							}
							result = '<ul class="l-sub">' + items + '</ul>';
						}

						if (typeof config.color === "object") {
							renderItems(config.color);
						} else if (typeof config.fillColor === "object") {
							renderItems(config.fillColor);
						}
						return result;
						
					}

					return '<div class="control-layers-selector">' +
						'<input ng-checked="'+ userLayersConfig.loadFirst.includes(config.className) + '" ng-click="switchLayer(' + "'" + config.className + "'" +
							')" id="' + config.className + '" type="checkbox">' +
						'<label for="' + config.className + '">' +
							'<span class="'	+ config.type + ' ' + config.className + '"></span>' +
							'<span class="l-name">' + config.name + '</span>' + 							
						'</label>' + 
						'<span class="fa fa-edit" ng-class="{' + "'" + 'active' + "'" + ': edit ==' + "'" + config.className + "'" +  '}" ' +
						'ng-click="moveTop('  + "'" + config.className + "'" + ')"></span>' +
						multiColorLayerFunc() +
						'</div>';
				
				};

				var switcher = function (baseLayers, layerName) {
					if (!baseLayers.overlays[layerName]) {
						addLayer(userLayersConfig[layerName], layerName);
					} else {
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
					}
				};

				var renderHmtl = function() {
					var list = '';
					var categoryList = '';
					var categoriesArray = {};
					for (layer in layers) {						
						var zone = userLayersConfig[layer].zone;
						if(zone && categoriesArray.hasOwnProperty(zone)) {
							categoriesArray[zone].push(layer);
						} else if(zone && !categoriesArray.hasOwnProperty(zone)) {
							categoriesArray[zone] = [layer];
						}
						else {
							categoriesArray[layer] = layer;
						}
					}
					for (category in categoriesArray) {
						if (typeof categoriesArray[category] === 'string') {
							var layerConfig = userLayersConfig[category];
							list += createCheckbox(layerConfig, 'checked');							
						} else {
							var checkboxes = '';
							scope[category] = true;
							categoriesArray[category].map(function(item) {
								checkboxes += createCheckbox(userLayersConfig[item], category);
							});
							var categoryName = category.replace(/_/g, '-');

							list +=
								'<div class="control-layers-selector category">' +	
									'<div class="w-category-name" ng-click="show' + category + '= !show' + category + '">' +						
										'<span class="category-label">' + categoryName + '</span>' +
										'<span class="fa fa-angle-down"> </span>' +
									'</div>' +
									'<div class="sub-categories" ng-show="show' + category + '">' + checkboxes + '</div>' +
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

				scope.moveTop = function(layer) {
					scope.edit = layer;
					leafletData.getLayers('map').then(function(baselayers) {
						zIndex += 1;
						console.log(baselayers.overlays[layer]);

						if( !baselayers.overlays[layer].options.renderer._container) {
							baselayers.overlays[layer].bringToFront();
						} else {
							baselayers.overlays[layer].options.renderer._container.style.zIndex = zIndex;
						}
						// console.log(baselayers.overlays[layer].options.renderer(function(e){ console.log(e)}));
						// baselayers.overlays[layer].bringToFront();
						// baselayers.overlays[$scope.userLayersConfig.topLayers[i]].bringToFront();
					})
				};

			}
		}
	}
]);