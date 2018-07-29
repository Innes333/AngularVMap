angular.module('vMapsApp')
	.directive('updateLayer', ['$document','$window', '$compile', 'leafletData', 'rolesConfig',
	function($document, $window, $compile, leafletData, rolesConfig, $rootScope) {
		return {
			restrict: 'A',
			scope: true,			
			link: function(scope, element, attrs){	
				console.log('on update');
				angular.element(element).on('click', function() {
					var form = angular.element(this).parent('form'),
						inputs = form[0].elements,
						formData = [];
					
					for (i=0; i < inputs.length -1; i++) {	
						formData.push[inputs[i].value];
						console.log(inputs[i].value);
					}
					console.log(form);
					console.log(formData);
				})

			
			}
		}
	}
]);