// Brand CONTROLLER
function bvController($scope, bvService, bvFactory) {
    $scope.title = "Bassin de vie List";
    $scope.busy = false;
    var page = 0;

    /*$scope.fileInputContent = "";
    $scope.onFileUpload = function (element) {
        $scope.$apply(function (scope) {
            var file = element.files[0];
            bvFactory.datas.fileName = file.name;
            bvFactory.datas.fileType = file.type;
            fileInputService.readFileAsync(file).then(function (fileInputContent) {
                bvFactory.datas.fileContent = fileInputContent;
                console.log(bvFactory.datas);
                bvService.addBVFile(bvFactory.datas);
            });
        });
    };*/

    /*$scope.geocode = function () {
        bvService.geocode().then(function (res) {
            console.log(res.data);
        });
    }*/

    bvService.findAllBV(page).then(function (res) {
        bvFactory.items = res.data;
        $scope.BVList = bvFactory.items;
    });

    $scope.nextPage = function () {
        if ($scope.busy) return;
        $scope.busy = true;
        page++;
        bvService.findAllBV(page).then(function (res) {
            bvFactory.items = bvFactory.items.concat(res.data);
            $scope.BVList = bvFactory.items;
            $scope.busy = false;
        });
    };
}
