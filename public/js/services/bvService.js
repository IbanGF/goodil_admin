// Shop SERVICE
function bvService($http) {
    return {
        findAllBV: function (page) {
            return $http.get('/findAllBVs/' + page);
        },
        findOneBV: function (codePostal) {
            return $http.get('/findOneBV/' + codePostal);
        }
    };
}
