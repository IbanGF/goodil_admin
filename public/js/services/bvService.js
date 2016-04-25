// Shop SERVICE
function bvService($http) {
    return {
        findAllBV: function () {
            return $http.get('/AllBV');
        },
        geocode: function () {
            return $http.get('/Geocode');
        },
        addBVFile: function (datas) {
            return $http.post('/addBVFile', datas);
        }
    }
};