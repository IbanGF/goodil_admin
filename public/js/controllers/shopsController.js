// Shop CONTROLLER
function shopsController($scope, $http, Upload, shopsService, brandsService, bvService) {
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
    var addedShop = {};

    addedShop.name = $scope.details.name;
    addedShop.address = $scope.details.formatted_address.split(',');
    addedShop.brand = $scope.addedShop.brand._id;
    addedShop.catchment_area_radius = $scope.addedShop.catchment_area_radius;
    $scope.addedShop.point = {};
    $scope.queryError = {};

    Upload.upload({
      url: '/brand/uploadBrandImage',
      file: $scope.addedShop.logo
    }).progress(function(event) {
      var progressPercentage = parseInt(100.0 * event.loaded / event.total);
      console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
    }).success(function(data, status, headers, config) {
      console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
      addedShop.logo = data.path;
      bvService.findOneBV($scope.details.address_components[$scope.details.address_components.length - 1].short_name).then(function(res) {
        addedShop.bassinDeVie = res.data._id;
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
            $scope.details.formatted_address + '&key=AIzaSyCzGZv5NhDcGeAHRo-YSb2Lx0byBLpZNgc')
          .then(function(_results) {
              addedShop.point = {
                type: "Point",
                coordinates: [_results.data.results[0].geometry.location.lat, _results.data.results[0].geometry.location.lng]
              };
              console.log(addedShop);
              shopsService.createShop(addedShop).then(function(res) {
                load();
              });
            },
            function error(_error) {
              $scope.queryError = _error;
            });
      });
    });
    $scope.addedShop = {};
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
