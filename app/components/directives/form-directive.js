angular.module('vMapsApp')
	.directive('updateLayer', ['$http', '$document','$window', '$compile', 'leafletData', 'rolesConfig',
	function($http, $document, $window, $compile, leafletData, rolesConfig, $rootScope) {
		return {
			restrict: 'A',
			scope: true,			
			link: function(scope, element, attrs) {
				angular.element(element).on('click', function() {
					var form = angular.element(this).parent('form'),
						inputs = form[0].elements,
						formData = {},
						schema = form[0].dataset.schema,
						layer = form[0].dataset.layer;
					
					for (i=0; i < inputs.length -1; i++) {	
						formData[inputs[i].dataset.column] = inputs[i].value;
					}

					formData.id &&
					$http.put(
						rolesConfig.baseUrl + 'gva/' + schema + '/' + layer + '/' + formData.id,
						formData
					);
				})

			
			}
		}
	}
]);