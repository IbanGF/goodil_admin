function dealsService($http) {
    return {
        getDeals: function () {
            return $http.get('/deal');
        },
        updateDeal: function (id, data) {
            return $http.put('/deal/' + id, data);
        },
        createDeal: function (data) {
            return $http.post('/deal', data);
        },
        deleteDeal: function (id) {
            return $http.delete('/deals/' + id);
        }
    }
};