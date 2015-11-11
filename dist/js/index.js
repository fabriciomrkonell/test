'use strict';

angular.module('app', ['ngMaterial', 'ngMessages']);

// Controller
angular.module('app').controller('AppCtrl', ['$scope', '$http', '$mdToast', function($scope, $http,  $mdToast) {

  angular.extend($scope, {
    data: {
      name: '',
      email: '',
      itens: [{
        id: 1,
        description: 'HTML',
        value: 0
      }, {
        id: 2,
        description: 'CSS',
        value: 0
      }, {
        id: 3,
        description: 'Javascript',
        value: 0
      }, {
        id: 4,
        description: 'Python',
        value: 0
      }, {
        id: 5,
        description: 'Django',
        value: 0
      }, {
        id: 6,
        description: 'iOS',
        value: 0
      }, {
        id: 7,
        description: 'Android',
        value: 0
      }]
    },
    error: false
  });

  // Send Form
  $scope.send = function(form){
    $http.post('/api/send', form).success(function(data){
      $scope.error = data.error;
      $mdToast.show($mdToast.simple().content(data.message).hideDelay(3000));
    }).error(function(error){
      $scope.error = true;
      $mdToast.show($mdToast.simple().content('Server not found!').hideDelay(3000));
    });
  };

}]);

// Init AngularJS
angular.element(document).ready(function() {
	angular.bootstrap(document, ['app']);
});