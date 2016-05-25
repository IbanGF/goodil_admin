// AddDeal CONTROLLER
function listDealsController($scope, $http, dealsService, categoriesService) {
  $scope.title = "List Deals";

  function load() {
    dealsService.getDeals().then(function(res) {
      var deals = res.data;

      // console.log(deals);
      // var categories = [];
      // var subCategories = [];
      // var unique = {};
      // for (var i in deals) {
      //   if (typeof(unique[deals[i].subCategory.name]) == "undefined") {
      //     subCategories.push(deals[i].subCategory.name);
      //   }
      //   unique[deals[i].subCategory.name] = 0;
      // }

      console.log(subCategories);
    });
  }

  categoriesService.getCategories().then(function(res) {
    $scope.categories = res.data;
  });

  load();


}
