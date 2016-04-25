// Shop CONTROLLER
function shopsController($scope, shopsService) {
    $scope.title = "Shops List";

    function load() {
        shopsService.getShops().then(function (res) {
            $scope.shops = res.data;
        });
    }
    $scope.add = function () {
        var data = {};
        data.name = $scope.name;
        data.address = $scope.address;
        data.catchment_area_radius = $scope.catchment_area_radius;
        shopsService.createShop(data).then(function (res) {
            load();
        });
        $scope.description = "";
    }
    $scope.update = function (shop) {
        shopsService.updateShop(shop._id, shop).then(function (res) {
            load();
        });
    }
    $scope.delete = function (shop) {
        shopsService.deleteShop(shop._id).then(function (res) {
            load();
        });
    }
    load();
}