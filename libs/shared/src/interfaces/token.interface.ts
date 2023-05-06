export interface RefreshToken {
    /** Токен */
    token: string;
    /** Дата истечения */
    exp: Date;
}

export interface Tokens {
    /** Access Token */
    accessToken: string;
    /** Refresh Token */
    refreshToken: RefreshToken;
}
