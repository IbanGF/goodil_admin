// Brand SERVICE
function brandsService($http) {
    return {
        getBrands: function () {
            return $http.get('/brand');
        },
        updateBrand: function (id, data) {
            return $http.put('/brand/' + id, data);
        },
        createBrand: function (data) {
            return $http.post('/brand', data);
        },
        deleteBrand: function (id) {
            return $http.delete('/brand/' + id);
        }
    };
}
