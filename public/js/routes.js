function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/brands.html',
            controller: 'brandsController'
        })
        .when('/shops', {
            templateUrl: 'views/shops.html',
            controller: 'shopsController'
        })
        .when('/bv', {
            templateUrl: 'views/bv.html',
            controller: 'bvController'
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}