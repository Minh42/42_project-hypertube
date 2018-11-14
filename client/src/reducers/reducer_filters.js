export const RATING_CHANGE = 'RATING_CHANGE';
export const RATING_NOTCHANGE = 'RATING_NOTCHANGE';

export const YEARS_CHANGE = 'YEARS_CHANGE';
export const YEARS_NOTCHANGE = 'YEARS_NOTCHANGE';

export const SORTBY_CHANGE = 'SORTBY_CHANGE';
export const SORTBY_NOTCHANGE = 'SORTBY_NOTCHANGE';

export const GENRE_FILTER = 'GENRE_FILTER';

const initialState = {
    ratingChange: false,
    yearsChange: false,
    sortByChange: false
};

export default function (state = initialState, action) {
	switch(action.type) {
		case RATING_CHANGE:
        return {
			...state,
			ratingChange: true,
            ratingFilter: action.payload
		};
		case RATING_NOTCHANGE:
        return {
            ...state,
			ratingChange: false
		};
		case YEARS_CHANGE:
        return {
			...state,
			yearsChange: true,
            yearsFilter: action.payload
		};
		case YEARS_NOTCHANGE:
        return {
            ...state,
			yearsChange: false
        };
        case SORTBY_CHANGE:
        return {
			...state,
			sortbyChange: true,
            sortby: action.payload
		};
		case SORTBY_NOTCHANGE:
        return {
            ...state,
			sortbyChange: false
		};
		case GENRE_FILTER:
        return {
            ...state,
			genreFilter: action.payload
		};
		default:
      	return state;
	}
}

export function FilterRatingAction(values) {
	return (dispatch) => {
		if (values != null) {
			dispatch({ 
				type: RATING_CHANGE,
				payload: values
			});
		} else {
			dispatch({ 
				type: RATING_NOTCHANGE
			});
		}
	}
}

export function FilterYearsAction(values) {
	return (dispatch) => {
		if (values != null) {
			dispatch({ 
				type: YEARS_CHANGE,
				payload: values
			});
		} else {
			dispatch({ 
				type: YEARS_NOTCHANGE
			});
		}
	}
}

export function SortByAction(values) {
	return (dispatch) => {
		if (values != null) {
			dispatch({ 
				type: SORTBY_CHANGE,
				payload: values
			});
		} else {
			dispatch({ 
				type: SORTBY_NOTCHANGE
			});
		}
	}
}

export function gendersAction(values) {
	return (dispatch) => {
		if (values != null) {
			dispatch({ 
				type: GENRE_FILTER,
				payload: values
			});
		} else {
			dispatch({ 
				type: SORTBY_NOTCHANGE
			});
		}
	}
}