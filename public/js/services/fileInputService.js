function fileInputService($q) {
    this.readFileAsync = function (file) {
        var deferred = $q.defer(),
            fileReader = new FileReader(),
            fileName = file.name,
            fileType = file.type,
            fileSize = file.size,
            lastModified = file.lastModified,
            lastModifiedDate = file.lastModifiedDate;
        fileReader.readAsText(file);

        /*Reference: Other options*/
        //fileReader.readAsDataURL(file);
        //fileReader.readAsBinaryString(file);
        //fileReader.readAsArrayBuffer(file);

        fileReader.onload = function (e) {
            deferred.resolve(e.target.result);
        };
        return deferred.promise;
    };
}
