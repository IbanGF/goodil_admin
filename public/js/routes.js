function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        })
        .when('/brands', {
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
        .when('/categories', {
            templateUrl: 'views/categories.html',
            controller: 'categoriesController'
        })
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'usersController'
        })
        .when('/deals', {
            templateUrl: 'views/deals.html',
            controller: 'dealsController'
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}