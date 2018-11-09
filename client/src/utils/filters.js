function filterByProperty(array, prop, min, max) {
    var filtered = new Array();
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        for (var key in obj) {
            var item = obj._source[prop];
            if (item <= max && item >= min) {
                filtered.push(obj);
                break;
            }
        }
    }
    return filtered;
}

function sortByProperty(array, prop, option) {
    var filtered = new Array();
    filtered = array.sort(function(obj1, obj2) {
        if (option) {
            if (option === "latest") {
                return obj2._source[prop] - obj1._source[prop]
            } else if (option === "earliest") {
                return obj1._source[prop] - obj2._source[prop]
            }
        } else {
            return obj2._source[prop] - obj1._source[prop]
        }
    })
    return filtered;
}

module.exports = {
    filterByProperty : filterByProperty,
    sortByProperty : sortByProperty
}