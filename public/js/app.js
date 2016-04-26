function run($rootScope, $location) {
    var path = function () {
        return $location.path();
    };
    $rootScope.$watch(path, function (newVal, oldVal) {
        $rootScope.activetab = newVal;
    });
}
angular.module('app', ['ngRoute'])
    .config(routes)
    .controller('brandsController', brandsController)
    .controller('shopsController', shopsController)
    .controller('bvController', bvController)
    .controller('categoriesController', categoriesController)
    .service('brandsService', brandsService)
    .service('shopsService', shopsService)
    .service('fileInputService', fileInputService)
    .service('bvService', bvService)
    .service('categoriesService', categoriesService)
    .factory('bvFactory', bvFactory)
    /*.run(run);*/