const yify = require('./yify.json');
const eztv = require('./eztv.json');

function removeDuplicateUsingFilter(arr){
    let unique_array = arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return unique_array
}

console.log(removeDuplicateUsingFilter(array_with_duplicates));