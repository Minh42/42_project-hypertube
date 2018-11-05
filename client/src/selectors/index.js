import { createSelector } from 'reselect';
import { filterByLikesProfile, filterByAge, filterByPopularity, filterByDistance, findAge, sortByAge, findPop, sortByPop, findDistance, sortByDistance, searchTag, filterByViewsProfile, profileWhoMatch, findUserByID, sortByScore, match } from '../../library/searchFunctions';

const getUsers = (state) => state.users.items
const getCurrentUser = (state) => state.auth.currentUser
const getFilter = (state) => state.filterUsers
const getConversationProfileID = (state) => state.profileConversation // tous les user avec qui le current user a une conversation en cours
const getRemitteeUserID = (state) => state.profileTchatID

export const getLikesUsers = createSelector([getUsers, getCurrentUser], (users, currentUser) => {
    const result = filterByLikesProfile(currentUser, users)
    return result;
})

export const getViewsUsers = createSelector([getUsers, getCurrentUser], (users, currentUser) => {
    const result = filterByViewsProfile(currentUser, users)
    return result;
});
    
export const getMatchedUsers = createSelector([getUsers, getCurrentUser], (users, currentUser) => {
    if (users != undefined && currentUser != undefined) {
        var result = match(currentUser, users);
        var sorted_result = sortByScore(result);
        return sorted_result;
    }
});

export const getFilterUsers = createSelector([getMatchedUsers, getCurrentUser, getFilter], (users, currentUser, filter) => {
    if (users != undefined && currentUser != undefined) {
    if (filter.ageChange === true) {
        var users = filterByAge(users, "birth_date", filter.ageFilter.min, filter.ageFilter.max)
    }
    if (filter.popularityChange === true) {
        var users = filterByPopularity(users, "popularity", filter.popularityFilter.min, filter.popularityFilter.max)
    }
    if (filter.distanceChange === true) {
        var users = filterByDistance(users, currentUser, filter.distanceFilter.min, filter.distanceFilter.max)
    }
    if (filter.sortbyChange === true) {
        if (filter.sortby === "age") {
            var arrayAge = findAge(users, "birth_date") // on recupere juste les dates d'anniv
            var newArray = arrayAge.sort(); // on trie du plus petit au plus grand
            var newArray = newArray.reverse() // on inverse du plus grand au plus petit
            var users = sortByAge(users, newArray, "birth_date") // on affiche les profils
        }
        else if (filter.sortby === "popularity") {
            var arrayPop = findPop(users, "popularity")
            var newArray = arrayPop.sort();
            var newArray = newArray.reverse()
            var users = sortByPop(users, newArray, "popularity") 
        }
        else if (filter.sortby === "distance") {
            var arrayDistance = findDistance(users, currentUser)
            var newArray = arrayDistance.sort();
            var users = sortByDistance(users, newArray, currentUser) 
        }
    }
    if (filter.searchTag === true && filter.tag.length > 0) {
        var tag = filter.tag
        var users = searchTag(users, tag)
    }
    else if (filter.ageChange === false && filter.distanceChange === false && filter.popularityChange === false && filter.searchTag === false) {
        return users;
    }
    return users;
    }   
});

// TCHAT/MESSAGES/CONVERSATION

export const getMatchProfiles = createSelector([getLikesUsers, getCurrentUser], (users, currentUser) => {
    if (users != null && currentUser !== undefined) {
        var result = profileWhoMatch(currentUser, users);
    }
    return result;
})

export const getConversationProfileUser = createSelector([getUsers, getConversationProfileID], (users, id_users) => {
    if (id_users !== null) {
        var profileUserConvers = findUserByID(users, id_users.profileConversation)
    }
    return profileUserConvers;
})

// export const getProfileRemittee = createSelector([getUsers, getRemitteeUserID], (users, remitteeID) => {
//     console.log('users', users)
//     console.log(remitteeID)
//     if (remitteeID !== null) {
//         var remittee = [remitteeID.profileTchatID]
//         console.log(remittee[0])
//         var profileUserTchat = findUserByID(users, remitteeID.profileTchatID)
//     }
//     return profileUserTchat;
// })
