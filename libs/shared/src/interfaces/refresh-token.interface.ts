export interface RefreshToken {
    /** Refresh token формата UUID */
    token: string;
    /** Дата истечения срока действия токена */
    exp: Date;
    /** Идентификатор пользователя */
    userId?: string;
}
