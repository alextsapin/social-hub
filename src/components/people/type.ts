export type personType = {
    name: string;
    isAuth: boolean;
    image: string;
    status: string;
}

export type personFollowType = {
    id: number;
    followed: boolean;
}

export type personFollowUsersType = {
    followUsers: Array<number>;
}

export type personFollowTCType = {
    unfollowTC: (id: number) => void;
    followTC: (id: number) => void;
}

export type peopleType = {
    data: Array<any>  
    currentPage: number
    pages: Array<number>
    onPageUsers: number
    onPortionPage: number
    usersTotal: number
    portionTotal: number
    pagesTotal: number
    isConnect: boolean
    isAuth: boolean
    pageChange: (page: number) => void 
}

export type peopleServerTCType = {  
    getUsersTC: (currentPage: number, onPageUsers: number) => void
    pageChangeTC: (page: number, onPageUsers: number) => void
}