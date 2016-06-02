function connectController($scope, $rootScope, $location, connectService, $window) {

  $scope.connect = function() {
    connectService.connect($scope.user).then(function(res) {
      $window.sessionStorage.setItem('token', res.data.token);
      $window.sessionStorage.setItem('user', res.data.user);
      $rootScope.token = res.data.token;
      $rootScope.user = res.data.user;
      $location.path('/addDeal');
    }).catch(function() {
      $rootScope.loginMessage.title = "Connexion error";
      $rootScope.loginMessage.message = "Error login or password";
    });
  };
}
