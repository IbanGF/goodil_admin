function dealsService($http) {
    return {
        getDeals: function () {
            return $http.get('/deals');
        },
        getDealsInSubCategory: function (subCategory) {
            return $http.get('/dealsInSubCategory/' + subCategory);
        },
        getDealsInSshop: function (shop) {
            return $http.get('/dealsInShop/' + shop);
        },
        updateDeal: function (id, deal) {
            return $http.put('/deal/' + id, deal);
        },
        createDeal: function (deal) {
            return $http.post('/deal', deal);
        },
        deleteDeal: function (id, shopId) {
            return $http.delete('/deal/' + id + '/' + shopId);
        }
    };
}
