function OpenJSONFile (requestedFile) {
    var request = new XMLHttpRequest();
    var file = requestedFile;
    var jsonFile = [];

    request.onreadystatechange = function () {
        if(request.readyState == 4 && request.status == 200) {
            jsonFile = JSON.parse(request.responseText);
            return jsonFile;
        }
    }

    request.open("GET", file, false);
    request.send();
}