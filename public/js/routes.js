function routes($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/connect.html',
      controller: 'connectController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'signupController'
    })
    .when('/addDeal', {
      templateUrl: 'views/addDeal.html',
      controller: 'addDealController',
      resolve: {
        connected: checkIsConnected
      }
    })
    .when('/listDeals', {
      templateUrl: 'views/listDeals.html',
      controller: 'listDealsController',
      resolve: {
        connected: checkIsConnected
      }
    })
    .when('/brands', {
      templateUrl: 'views/brands.html',
      controller: 'brandsController',
      resolve: {
        connected: checkIsConnected
      }
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController',
      resolve: {
        connected: checkIsConnected
      }
    })
    .when('/shops', {
      templateUrl: 'views/shops.html',
      controller: 'shopsController',
      resolve: {
        connected: checkIsConnected
      }
    })
    .when('/bv', {
      templateUrl: 'views/bv.html',
      controller: 'bvController',
      resolve: {
        connected: checkIsConnected
      }
    })
    .when('/categories', {
      templateUrl: 'views/categories.html',
      controller: 'categoriesController',
      resolve: {
        connected: checkIsConnected
      }
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'usersController',
      resolve: {
        connected: checkIsConnected
      }
    })
    .otherwise({
      redirectTo: '/'
    });

    $httpProvider.interceptors.push(function ($q, $location, $window) {
       return {
           'request': function (config) {
               config.headers = config.headers || {};
               if ($window.sessionStorage.getItem('token')) {
                   config.headers.authorization = $window.sessionStorage.getItem('token');
               }
               return config;
           },
           'responseError': function (response) {
               if (response.status === 401 || response.status === 403) {
                   $location.path('/');
               }
               return $q.reject(response);
           }
       };
    });
}
