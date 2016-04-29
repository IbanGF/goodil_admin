function dealsController($scope, dealsService) {
    $scope.title = "Deal List";

    function load() {
        dealsService.getDeals().then(function (res) {
            $scope.deals = res.data;
        });
    }
    $scope.add = function () {
        var data = {};
        data.name = $scope.name;
        data.description = $scope.description;
        data.term = $scope.term;
        data.start_date = $scope.start_date;
        data.end_date = $scope.end_date;

        dealsService.createDeal(data).then(function (res) {
            load();
        });
        $scope.description = "";
    }
    $scope.update = function (deal) {
        dealsService.updateDeal(deal._id, deal).then(function (res) {
            load();
        });
    }
    $scope.delete = function (deal) {
        dealsService.deleteDeal(deal._id).then(function (res) {
            load();
        });
    }
    load();
}