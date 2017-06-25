(function(){
	angular.module('nameApp')
		.controller('mapCtrl', ['$http', 'leafletData', '$interval','$rootScope','$scope', '$window', '$routeParams', '$timeout', '$localStorage', 'apiUrl', 'baseFunc', 'dataService', function($http, leafletData, $interval, $rootScope, $scope, $window, $routeParams, $timeout, $localStorage, apiUrl, baseFunc, dataService){

		$scope.test = "Hello from main controller!";

		angular.extend($scope, {
			man: {
				lat: 0.407885,
				lng: 9.4706029,
				zoom: 15
			},
			controls: {
				scale: true,
			}
		}),


		// Get the countries geojson data from a JSON
		dataService.getData(apiUrl.geoJsonUrl + 'data.geojson')
			.then(function (response) {
				angular.extend($scope, {
					geojson: {
						data: response.data,
						style: {
							fillColor: "green",
							weight: 20,
							opacity: 1,
							color: 'red',
							dashArray: '3',
							fillOpacity: 0.7
						}
					}
				});
			}, function (error) {
				throw dataService.catchError(error,'Ajax call error massege!');
			});
		// $http.get("./GeoJSON/POLES_WORK.json").success(function(data, status) {
		// 	angular.extend($scope, {
		// 		geojson: {
		// 			data: data,
		// 			style: {
		// 				fillColor: "green",
		// 				weight: 2,
		// 				opacity: 1,
		// 				color: 'white',
		// 				dashArray: '3',
		// 				fillOpacity: 0.7
		// 			}
		// 		}
		// 	});
		// });



	}]);
}());
