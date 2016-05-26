function routes($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/addDeal.html',
      controller: 'addDealController'
    })
    .when('/listDeals', {
      templateUrl: 'views/listDeals.html',
      controller: 'listDealsController'
    })
    .when('/brands', {
      templateUrl: 'views/brands.html',
      controller: 'brandsController'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController'
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
    .when('/about', {
      templateUrl: 'views/about.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}
