// Shop CONTROLLER
function shopsController($scope, shopsService, brandsService) {
  $scope.title = "Magasin";
  $scope.addedShop = {};

  brandsService.getBrands().then(function(res) {
    $scope.brands = res.data;
  });

  function load() {
    shopsService.getShops().then(function(res) {
      $scope.shops = res.data;
    });
  }

  $scope.add = function() {
    var data = {};
    data.name = $scope.addedShop.name;
    data.address = $scope.addedShop.address.split(',');
    data.logo = $scope.addedShop.logo;
    data.brand = $scope.addedShop.brand._id;
    data.catchment_area_radius = $scope.addedShop.catchment_area_radius;
    shopsService.createShop(data).then(function(res) {
      load();
    });
    $scope.addedShop = "";
  };

  $scope.update = function(shop) {
    shopsService.updateShop(shop._id, shop).then(function(res) {
      load();
    });
  };

  $scope.delete = function(shop) {
    shopsService.deleteShop(shop._id).then(function(res) {
      load();
    });
  };

  load();
}
