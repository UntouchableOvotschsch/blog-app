export enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface User {
    id: string,
    username: string
    avatar?: string
    roles: UserRoles[]
}

export interface UserSchema {
    authData?: User,

}
