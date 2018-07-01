angular.module('vMapsApp')
	.directive('formUpdate', ['$document','$window', '$compile', 'leafletData', 'rolesConfig',
	function($document, $window, $compile, leafletData, rolesConfig, $rootScope) {
		return {
			restrict: 'E',
			scope: true,			
			link: function(scope, element, attrs){	
                console.log(element);
				var layers = scope.$parent.userLayers,
					userLayersConfig = scope.$parent.userLayersConfig,
					addLayer = scope.$parent.addLayer;
				scope.checked = true;

				
				var renderHmtl = function() {
					var list = '<form> form </form>';
					var categoryList = '';
					var layersArray = {};
					
					return list;
				};

				element.append($compile(renderHmtl())(scope));

			
			}
		}
	}
]);