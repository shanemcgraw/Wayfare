angular.module('wayfare.map', [])

.controller('MapController', function ($scope, Maps) {
	$scope.initMap = Maps.initMap;
});