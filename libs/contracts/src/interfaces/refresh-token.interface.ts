export interface RefreshToken {
    /** Refresh token формата UUID */
    token: string;
    /** Идентификатор пользователя */
    userId: string;
    /** Дата истечения срока действия токена */
    exp: Date;
}
