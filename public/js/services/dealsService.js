function dealsService($http) {
    return {
        getDeals: function () {
            return $http.get('/deal');
        },
        updateDeal: function (id, deal) {
            return $http.put('/deal/' + id, deal);
        },
        createDeal: function (deal) {
            return $http.post('/deal', deal);
        },
        deleteDeal: function (id) {
            return $http.delete('/deals/' + id);
        }
    };
}
