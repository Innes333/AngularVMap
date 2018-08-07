angular.module('vMapsApp')
	.directive('popupBtn', ['$document','$window', '$compile', popupBtn])
	.directive('popupClose', ['$document','$window', '$compile', popupClose])

	function popupBtn($document,$window,$compile){
		return {
			restrict: 'A',
			scope: true,
			link: function(scope,element,attrs,ngModel){
				console.log('popup');
				element.bind('click', function(e){
					var popupId = attrs.popupBlock,
							popupEl = document.getElementById(popupId);							
					angular.element(popupEl).addClass('active');

					if(attrs.images) {		
						var imgList	= attrs.images.split(',').map(function(item){
							return 'gsm_data/Mile_7/' + item;
						});
						scope.$parent.imageList = imgList;
						// if(!scope.$$phase) scope.$apply(); 
					}
					console.log(attrs);
					if(attrs.videos) {		
						var videoList= attrs.videos.split(',').map(function(item){
							return 'gsm_data/Mile_7/' + item;
						});
						scope.$parent.videoList = videoList;
					}

					console.log(scope);
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
					var popups = document.getElementsByClassName('popup');
					for(var i = 0; i < popups.length; i++){
						angular.element(popups[i]).removeClass('active');
					};
				});
			}
		}
	};