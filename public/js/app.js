function run($rootScope, $location) {
  var path = function() {
    return $location.path();
  };
  $rootScope.$watch(path, function(newVal, oldVal) {
    $rootScope.activetab = newVal;
  });
}

angular.module('app', ['ngRoute', 'infinite-scroll', 'ui.materialize', 'ngFileUpload', 'ngMap', 'ngAutocomplete'])
  .config(routes)
  .controller('navBarController', navBarController)
  .controller('addDealController', addDealController)
  .controller('listDealsController', listDealsController)
  .controller('brandsController', brandsController)
  .controller('shopsController', shopsController)
  .controller('bvController', bvController)
  .controller('categoriesController', categoriesController)
  .controller('usersController', usersController)
  .controller('dashboardController', dashboardController)
  .service('brandsService', brandsService)
  .service('shopsService', shopsService)
  .service('bvService', bvService)
  .service('categoriesService', categoriesService)
  .service('subCategoriesService', subCategoriesService)
  .service('usersService', usersService)
  .service('dealsService', dealsService)
  .factory('bvFactory', bvFactory)
  .factory('dealFactory', dealFactory)
  .run(function($rootScope, NgMap) {
    NgMap.getMap().then(function(map) {
      $rootScope.map = map;
    });
  });
/*.run(run);*/
