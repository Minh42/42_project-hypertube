import { createSelector } from 'reselect';
import { filterByProperty, filterByYear, sortByProperty, filterByGenres } from '../utils/filters';

const getMovies = (state) => state.search.results
const getFilters = (state) => state.filters

export const getFilterMovies = createSelector([getMovies, getFilters], (movies, filters) => {
    if (movies !== null) {
        console.log(filters)
        if (filters.ratingChange) {
            var movies = filterByProperty(movies, "imdb_rating", filters.ratingFilter.min, filters.ratingFilter.max);
        }
        if (filters.yearsChange) {
            var movies = filterByYear(movies, "year", filters.yearsFilter.min, filters.yearsFilter.max);
        }
        if (filters.sortbyChange) {
            if (filters.sortby === "relevance") {
                var movies = sortByProperty(movies, "imdb_rating", null)
            }
            else if (filters.sortby === "latest") {
                var movies = sortByProperty(movies, "year", "latest")
            }
            else if (filters.sortby === "earliest") {
                var movies = sortByProperty(movies, "year", "earliest") 
            }
        }
        if (filters.genreFilter)
        {
            if (filters.genreFilter.length > 0) {
                var movies = filterByGenres(movies, "genres", filters.genreFilter);
            } else {
                return movies;
            }
        }
        return movies;
    } else {
        return movies;
    }
});
