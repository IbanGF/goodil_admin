// Brand CONTROLLER
function brandsController($scope, Upload, brandsService) {
  $scope.title = "Enseigne";

  function load() {
    brandsService.getBrands().then(function(res) {
      $scope.brands = res.data;
    });
  }
  $scope.add = function(file) {
    var brand = {};
    brand.name = $scope.name;
    brand.description = $scope.description;
    Upload.upload({
      url: '/brand/uploadBrandImage',
      file: file
    }).progress(function(event) {
      var progressPercentage = parseInt(100.0 * event.loaded / event.total);
      console.log('progress: ' + progressPercentage + '% ' + event.config.file.name);
    }).success(function(data, status, headers, config) {
      console.log('file ' + config.file.name + ' uploaded. Response: ' + JSON.stringify(data));
      brand.logo = data.path;
      brandsService.createBrand(brand).then(function(res) {
        load();
      });
    });
  };
  $scope.update = function(brand) {
    console.log(brand);
    brandsService.updateBrand(brand._id, brand).then(function(res) {
      load();
    });
  };
  $scope.delete = function(brand) {
    brandsService.deleteBrand(brand._id).then(function(res) {
      load();
    });
  };
  load();
}
