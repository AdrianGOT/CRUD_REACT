export interface User{ 
    name   : string, 
    email  : string,
    github : string
}

export interface UserWithId extends User {
    id: string
}

export type UserId = string;


export type ListOfUserWithId = UserWithId[]; 
export type ListOfUser = User[];