import { createSelector } from 'reselect';
import { filterByProperty, sortByProperty } from '../utils/filters';

const getMovies = (state) => state.search.results
const getFilters = (state) => state.filters

export const getFilterMovies = createSelector([getMovies, getFilters], (movies, filters) => {
    if (movies !== undefined) {
        if (filters.ratingChange) {
            var movies = filterByProperty(movies, "rating", filters.ratingFilter.min, filters.ratingFilter.max);
        }
        if (filters.yearsChange) {
            var movies = filterByProperty(movies, "year", filters.yearsFilter.min, filters.yearsFilter.max);
        }
        if (filters.sortbyChange) {
            if (filters.sortby === "relevance") {
                var movies = sortByProperty(movies, "rating", null)
            }
            else if (filters.sortby === "latest") {
                var movies = sortByProperty(movies, "year", "latest")
                console.log(movies)
            }
            else if (filters.sortby === "earliest") {
                var movies = sortByProperty(movies, "year", "earliest") 
            }
        }
        return movies;
    } else {
        return movies;
    }
});


    // if (users != undefined && currentUser != undefined) {
    // if (filter.ageChange === true) {
    //     var users = filterByAge(users, "birth_date", filter.ageFilter.min, filter.ageFilter.max)
    // }
    // if (filter.popularityChange === true) {
    //     var users = filterByPopularity(users, "popularity", filter.popularityFilter.min, filter.popularityFilter.max)
    // }
    // if (filter.distanceChange === true) {
    //     var users = filterByDistance(users, currentUser, filter.distanceFilter.min, filter.distanceFilter.max)
    // }
    // if (filter.sortbyChange === true) {
    //     if (filter.sortby === "age") {
    //         var arrayAge = findAge(users, "birth_date") // on recupere juste les dates d'anniv
    //         var newArray = arrayAge.sort(); // on trie du plus petit au plus grand
    //         var newArray = newArray.reverse() // on inverse du plus grand au plus petit
    //         var users = sortByAge(users, newArray, "birth_date") // on affiche les profils
    //     }
    //     else if (filter.sortby === "popularity") {
    //         var arrayPop = findPop(users, "popularity")
    //         var newArray = arrayPop.sort();
    //         var newArray = newArray.reverse()
    //         var users = sortByPop(users, newArray, "popularity") 
    //     }
    //     else if (filter.sortby === "distance") {
    //         var arrayDistance = findDistance(users, currentUser)
    //         var newArray = arrayDistance.sort();
    //         var users = sortByDistance(users, newArray, currentUser) 
    //     }
    // }
    // if (filter.searchTag === true && filter.tag.length > 0) {
    //     var tag = filter.tag
    //     var users = searchTag(users, tag)
    // }
    // else if (filter.ageChange === false && filter.distanceChange === false && filter.popularityChange === false && filter.searchTag === false) {
    //     return users;
    // }
    // return users;
    // }   
