function run($rootScope, $location, connectService, $window) {
  if ($window.sessionStorage.getItem('token')) {
    $rootScope.token = $window.sessionStorage.getItem('token');
    $rootScope.user = $window.sessionStorage.getItem('user');
  }
  $rootScope.loginMessage = {};
  $rootScope.loginMessage.title = '';
  $rootScope.loginMessage.message = '';

  // Watch path
  var path = function() {
    return $location.path();
  };
  $rootScope.$watch(path, function(newVal, oldVal) {
    $rootScope.activetab = newVal;
  });

  // Logout
  $rootScope.logout = function() {
    $window.sessionStorage.removeItem('token');
    $window.sessionStorage.removeItem('user');
    $rootScope.token = null;
    $rootScope.user = null;
    $rootScope.loginMessage.title = '';
    $rootScope.loginMessage.message = '';
    connectService.disconnect().then(function() {
      $location.url('/login');
    })
  }

}

function checkIsConnected($q, $http, $rootScope, $location) {
  var deferred = $q.defer();

  $http.get('/api/loggedin').success(function() {
    // Authenticated
    deferred.resolve();
  }).error(function() {
    // Not Authenticated
    deferred.reject();
    $location.url('/login');
  });

  return deferred.promise;
};

function checkPassword() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.checkPassword;
      elem.add(firstPassword).on('keyup', function() {
        scope.$apply(function() {
          var v = elem.val() === $(firstPassword).val();
          ctrl.$setValidity('passwordMatch', v);
        });
      });
    }
  }
}

angular.module('app', ['ngRoute', 'infinite-scroll', 'ui.materialize', 'ngFileUpload', 'ngMap', 'ngAutocomplete'])
  .config(routes)
  .directive('checkPassword', checkPassword)
  .controller('addDealController', addDealController)
  .controller('listDealsController', listDealsController)
  .controller('brandsController', brandsController)
  .controller('shopsController', shopsController)
  .controller('bvController', bvController)
  .controller('categoriesController', categoriesController)
  .controller('connectController', connectController)
  .controller('signupController', signupController)
  .controller('usersController', usersController)
  .controller('dashboardController', dashboardController)
  .service('brandsService', brandsService)
  .service('shopsService', shopsService)
  .service('bvService', bvService)
  .service('categoriesService', categoriesService)
  .service('subCategoriesService', subCategoriesService)
  .service('connectService', connectService)
  .service('userService', userService)
  .service('dealsService', dealsService)
  .factory('bvFactory', bvFactory)
  .factory('dealFactory', dealFactory)
  .run(run);
/*.run(run);*/
