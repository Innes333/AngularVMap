angular.module('vMapsApp')
	.directive('popupBtn', ['$document','$window', '$compile', popupBtn])
	.directive('popupClose', ['$document','$window', '$compile', popupClose])

	function popupBtn($document,$window,$compile){
		return {
			restrict: 'A',
			scope: true,
			link: function(scope,element,attrs,ngModel){
				element.bind('click', function(e){
					var popupId = attrs.popupBlock,
							popupEl = document.getElementById(popupId),
							folderName = attrs.name,
							count = [1];

					angular.element(popupEl).addClass('active');

					scope.$parent.siteName = attrs.name;
					// scope.$parent.siteCount = Array(attrs.count).fill(1).map(Number.call, Number).slice(1, attrs.count);
					scope.$parent.isimgshown = false;
					scope.$parent.isVideoShown = false;
					scope.$parent.isOrtoShown = false;
					scope.$parent.is3dShown = false;
					
					
					if(attrs.images1) {		
						scope.$parent.isimgshown = true;
						var imgList	= attrs.images1.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/1/' + item;
						});
						scope.$parent.imageList1 = imgList;
					}

					if(attrs.images2) {		
						scope.$parent.isimgshown = true;
						var imgList	= attrs.images2.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/2/' + item;
						});
						scope.$parent.imageList2 = imgList;
						count.push(2);
					}

					if(attrs.images3) {		
						scope.$parent.isimgshown = true;
						var imgList	= attrs.images3.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/3/' + item;
						});
						scope.$parent.imageList3 = imgList;
						count.push(3); 
					}

					if(attrs.images4) {		
						scope.$parent.isimgshown = true;
						var imgList	= attrs.images4.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/4/' + item;
						});
						scope.$parent.imageList4 = imgList;
						count.push(4); 
					}

					console.log(attrs);
					if(attrs.videos) {		
						var videoList= attrs.videos.split(',').map(function(item){
							return 'gsm_data/Mile_7/' + item;
						});
						scope.$parent.videoList = videoList;
						scope.$parent.isVideoShown = true;
					}
					if(attrs.ortho !== 'null') {						
						scope.$parent.orthophoto = 'gsm_data/' + folderName + '/ortho/' + attrs.ortho;
						scope.$parent.isOrtoShown = true;
					}
					
					scope.$parent.siteCount = count;
					console.log(scope.$parent.siteCount);

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