export interface UserState {
    isAuthenticated: boolean;
    user: User;
}

export interface User{
    id: number;
    username: string;
    email: string;
}

export interface UserPayload{
    user: User;
    token: Token;
}

export interface Token{
    id: number;
    email: string;
    role: string;
    iat: number;
}

