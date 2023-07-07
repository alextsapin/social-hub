export type UserType = {
    id: number;
    name: string;
    status: string;
    photos: {
        small: string | null;
        large: string | null;
    };
    followed: boolean;
};

export type HomeStateType = {
    followUsers: Array<number>;
    users: UserType[];
    usersCount: number;
    pageSize: number;
    sectionSize: number;
    currentPage: number;
    sectionNumber: number;
};

export type SetSectionNumberType = {
    type: 'HOME/SET_SECTION';
    section: number;
};

export type ToggleUserFollowType = {
    type: 'HOME/TOGGLE_USER_FOLLOW';
    id: number;
    isFetching: boolean;
};

export type FollowType = {
    type: 'HOME/FOLLOW';
    id: number;
};
export type UnFollowType = {
    type: 'HOME/UNFOLLOW';
    id: number;
};

export type SetUsersType = {
    type: 'HOME/SET_USERS';
    users: UserType[];
};

export type SetUsersCountType = {
    type: 'HOME/SET_USERS_COUNT';
    count: number;
};

export type SetCurrentPageType = {
    type: 'HOME/SET_CURRENT_PAGE';
    currentPage: number;
};

export type SetPagesType = {
    type: 'HOME/SET_PAGE_ARRAY';
    pageArray: number[];
};

export type HomeActionsType =
    | SetSectionNumberType
    | ToggleUserFollowType
    | FollowType
    | UnFollowType
    | SetUsersType
    | SetUsersCountType
    | SetCurrentPageType
    | SetPagesType;
