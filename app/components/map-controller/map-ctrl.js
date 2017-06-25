(function(){
	angular.module('nameApp')
		.controller('mapCtrl', ['$http', 'leafletData', '$interval','$rootScope','$scope', '$window', '$routeParams', '$timeout', '$localStorage', 'apiUrl', 'baseFunc', 'dataService', function($http, leafletData, $interval, $rootScope, $scope, $window, $routeParams, $timeout, $localStorage, apiUrl, baseFunc, dataService){

		$scope.test = "Hello from main controller!";

		angular.extend($scope, {
			man: {
				lat: 9.405006,
				lng: 0.495222,
				zoom: 15
			},
			controls: {
				scale: true,
			}
		}),

		// Get the countries geojson data from a JSON
		$http.get("/GeoJSON/POLES_WORK.json").success(function(data, status) {
			angular.extend($scope, {
				geojson: {
					data: data,
					style: {
						fillColor: "green",
						weight: 2,
						opacity: 1,
						color: 'white',
						dashArray: '3',
						fillOpacity: 0.7
					}
				}
			});
		});

		$scope.loadItems = function(){
			dataService.getData(apiUrl.itemsUrl)
				.then(function (response) {
					$scope.itemList = response.data;
				}, function (error) {
					throw dataService.catchError(error,'Ajax call error massege!');
			});
		};

	}]);
}());
