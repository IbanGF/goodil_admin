// Brand CONTROLLER
function bvController($scope, bvService, bvFactory) {
    $scope.title = "Bassin de vie List";

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

    bvService.findAllBV().then(function (res) {
        console.log(res.data);
        $scope.BVList = res.data;
    });
}