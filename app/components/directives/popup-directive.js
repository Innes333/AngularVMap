angular.module('vMapsApp')
	.directive('popupBtn', ['$document','$window', '$compile', 'leafletData', popupBtn])
	.directive('popupClose', ['$document','$window', '$compile', popupClose])

	function popupBtn($document,$window,$compile, leafletData){
		return {
			restrict: 'A',
			scope: true,
			link: function(scope,element,attrs,ngModel){
				element.bind('click', function(e){
					var popupId = attrs.popupBlock,
							popupEl = document.getElementById(popupId);

					angular.element(popupEl).addClass('active');
					angular.element(popupEl).find('img').attr('src', 'data_img/' + attrs.src);
				
				});
			}
		}
	};
	function popupClose($document,$window,$compile){
		return {
			restrict: 'A',
			scope: true,
			link: function(scope,element,attrs,ngModel){
				element.bind('click', function(e){
					if (attrs.onlyOne) {
						angular.element(element).parent().parent().removeClass('active');
					} else {
						var popups = document.getElementsByClassName('popup');
						for(var i = 0; i < popups.length; i++){
							angular.element(popups[i]).removeClass('active');
						};
					}
				});
			}
		}
	};