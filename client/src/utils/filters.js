function filterByProperty(array, prop, min, max) {
    var filtered = new Array();
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        for (var key in obj) {
            var item = obj._source[prop];
            if (item === "N/A")
                item = 0;
            if (item <= max && item >= min) {
                filtered.push(obj);
                break;
            }
        }
    }
    return filtered;
}

function filterByYear(array, prop, min, max) {
    var filtered = new Array();
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        for (var key in obj) {
            var item = obj._source[prop];
            if (item.length > 4)
                item = item.substring(0,4);
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
    console.log(filtered)
    return filtered;
}

function filterByGenres(array, prop, genre) {
    var filtered = new Array();
    
    for (var i = 0; i < array.length; i++) {
        var tab = array[i]._source.genres;
        var bool = 0;
        for (var k = 0; k < genre.length; k++) {
            for (var j = 0; j < tab.length; j++) {
                if (genre[k] === tab[j]) {
                    bool++;
                } if (bool === genre.length) {
                    filtered.push(array[i]);
                    break;
                }
            }
        }
    } 
    return filtered;
}

module.exports = {
    filterByProperty : filterByProperty,
    filterByYear: filterByYear,
    sortByProperty : sortByProperty,
    filterByGenres : filterByGenres
}