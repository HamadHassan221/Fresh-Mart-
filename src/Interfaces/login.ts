export interface failedLoginResponse {
    statusMsg: string,
    message: string
}

export interface successLoginResponse {
    message: string,
    user: userResponse,
    token: string
}

export interface userResponse{
    name: string,
    email: string,
    role: string
}