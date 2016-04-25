// Brand CONTROLLER
function brandsController($scope, brandsService) {
    $scope.title = "Brand List";

    function load() {
        brandsService.getBrands().then(function (res) {
            $scope.brands = res.data;
        });
    }
    $scope.add = function () {
        var data = {};
        data.name = $scope.name;
        data.description = $scope.description;
        data.logo = $scope.logo;
        brandsService.createBrand(data).then(function (res) {
            load();
        });
        $scope.description = "";
    }
    $scope.update = function (brand) {
        brandsService.updateBrand(brand._id, brand).then(function (res) {
            load();
        });
    }
    $scope.delete = function (brand) {
        brandsService.deleteBrand(brand._id).then(function (res) {
            load();
        });
    }
    load();
}