function run($rootScope, $location) {
    var path = function () {
        return $location.path();
    };
    $rootScope.$watch(path, function (newVal, oldVal) {
        $rootScope.activetab = newVal;
    });
}
angular.module('app', ['ngRoute','infinite-scroll'])
    .config(routes)
    .controller('brandsController', brandsController)
    .controller('shopsController', shopsController)
    .controller('bvController', bvController)
    .controller('categoriesController', categoriesController)
    .controller('usersController', usersController)
    .controller('dealsController', dealsController)
    .service('brandsService', brandsService)
    .service('shopsService', shopsService)
    .service('fileInputService', fileInputService)
    .service('bvService', bvService)
    .service('categoriesService', categoriesService)
    .service('usersService', usersService)
    .service('dealsService', dealsService)
    .factory('bvFactory', bvFactory)
    /*.run(run);*/