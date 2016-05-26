// Shop CONTROLLER
function shopsController($scope, $http, shopsService, brandsService, bvService) {
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
    data.name = $scope.addedShop.details.name;
    data.address = $scope.addedShop.details.formatted_address.split(',');
    data.logo = $scope.addedShop.logo;
    data.brand = $scope.addedShop.brand._id;
    data.catchment_area_radius = $scope.addedShop.catchment_area_radius;
    console.log($scope.addedShop.details);
    console.log($scope.addedShop.details.address_components[$scope.addedShop.details.address_components.length - 1].short_name);


    bvService.findOneBV($scope.addedShop.details.address_components[$scope.addedShop.details.address_components.length - 1].short_name).then(function(res) {
      console.log(res);
      data.bassinDeVie = res.data._id;
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
          data.address.join(',') + '&key=AIzaSyCzGZv5NhDcGeAHRo-YSb2Lx0byBLpZNgc')
        .then(function(_results) {
            data.point = {
              type: "Point",
              coordinates: [_results.data.results[0].geometry.location.lat, _results.data.results[0].geometry.location.lng]
            };
            shopsService.createShop(data).then(function(res) {
              load();
            });
          },
          function error(_error) {
            $scope.queryError = _error;
          });
    });
    $scope.addedShop = "";
  };

  $scope.update = function(shop) {
    shopsService.updateShop(shop._id, shop).then(function(res) {
      load();
    });
  };

  $scope.delete = function(shop) {
    shopsService.deleteShop(shop._id, shop.brand._id).then(function(res) {
      load();
    });
  };

  load();
}
