'use strict';


angular.module('wayfare', ['wayfare.form'])
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'forms/form.html',
      controller: 'FormController',
    })
    .otherwise({
      redirectTo: '/'
    });
})

//build services!
