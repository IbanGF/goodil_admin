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
    addedShop.point = {
      type: "Point",
      coordinates: [$scope.details.geometry.location.lat(), $scope.details.geometry.location.lng()]
    };

    Upload.upload({
      url: '/brand/uploadBrandImage',
      file: $scope.addedShop.logo
    }).progress(function(event) {
      var progressPercentage = parseInt(100.0 * event.loaded / event.total);
      console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
    }).success(function(data, status, headers, config) {
      addedShop.logo = data.path;
      bvService.findOneBV($scope.details.address_components[$scope.details.address_components.length - 1].short_name).then(function(res) {
        addedShop.bassinDeVie = res.data._id;
        console.log(addedShop);
        shopsService.createShop(addedShop).then(function(res) {
          load();
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
