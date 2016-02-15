'use strict';
angular.module('wayfare', [
	'wayfare.form',
	'ngRoute'
	])

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../app/forms/forms.html',
      controller: 'FormController',
    })
    .otherwise({
      redirectTo: '/'
    });
})

//build services!
