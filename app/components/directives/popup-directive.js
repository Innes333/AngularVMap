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
							count = ['A'];

					angular.element(popupEl).addClass('active');

					scope.$parent.siteName = attrs.name;
					// scope.$parent.siteCount = Array(attrs.count).fill(1).map(Number.call, Number).slice(1, attrs.count);
					scope.$parent.isimgshown = false;
					scope.$parent.isVideoShown = false;
					scope.$parent.isOrtoShown = false;
					scope.$parent.is3dShown = false;
					
					
					if(attrs.images1 && attrs.images1 !== 'null') {		
						scope.$parent.isimgshown = true;
						var imgList	= attrs.images1.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/1/' + item;
						});
						scope.$parent.imageList1 = imgList;
					}

					if(attrs.images2 && attrs.images2 !== 'null') {		
						scope.$parent.isimgshown = true;
						var imgList	= attrs.images2.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/2/' + item;
						});
						scope.$parent.imageList2 = imgList;
						count.push('B');
					}

					if(attrs.images3 && attrs.images3 !== 'null') {		
						scope.$parent.isimgshown = true;
						var imgList	= attrs.images3.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/3/' + item;
						});
						scope.$parent.imageList3 = imgList;
						count.push('C'); 
					}

					if(attrs.images4 && attrs.images4 !== 'null') {		
						scope.$parent.isimgshown = true;
						var imgList	= attrs.images4.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/4/' + item;
						});
						scope.$parent.imageList4 = imgList;
						count.push('D'); 
					}
					
					// ugly video src check
					if(attrs.video1 && attrs.video1 !== 'null') {		
						scope.$parent.isVideoShown = true;
						var videoList = attrs.video1.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/video/1/' + item;
						});
						scope.$parent.videoList1 = videoList;
						count.push('A'); 
					}

					if(attrs.video2 && attrs.video2 !== 'null') {		
						scope.$parent.isVideoShown = true;
						var videoList = attrs.video2.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/video/2/' + item;
						});
						scope.$parent.videoList2 = videoList;
						count.push('B'); 
					}

					if(attrs.video3 && attrs.video3 !== 'null') {		
						scope.$parent.isVideoShown = true;
						var videoList = attrs.video3.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/video/3/' + item;
						});
						scope.$parent.videoList3 = videoList;
						count.push('C'); 
					}

					if(attrs.video4 && attrs.video4 !== 'null') {		
						scope.$parent.isVideoShown = true;
						var videoList	= attrs.video4.split(',').map(function(item){
							return 'gsm_data/' + folderName + '/video/4/' + item;
						});
						scope.$parent.videoList4 = videoList;
						count.push('D'); 
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
					if (attrs.onlyOne) {
						angular.element(element).parent().parent().removeClass('active');
						console.log(angular.element(element).parent().parent());
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