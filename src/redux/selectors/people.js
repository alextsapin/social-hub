export const getPeople = (state) => {
    return state.people.data
}

export const getPageSize = (state) => {
    return state.people.size
}

export const getPeopleCount = (state) => {
    return state.people.count
}

export const getCurrentPage = (state) => {
    return state.people.currentPage
}

export const getIsConnect = (state) => {
    return state.people.isConnect
}

export const getFollowUsers = (state) => {
    return state.people.followUsers
}