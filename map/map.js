angular.module('wayfare.map', ['ngMap'])

.controller('HeatmapController', function ($scope, NgMap) {
  var heatmap, context = this;

  NgMap.getMap()
  .then(function (map) {
    context.map = map;
    console.log(map);
    heatmap = context.map.heatmapLayers;
    $scope.map = map;
  });
})