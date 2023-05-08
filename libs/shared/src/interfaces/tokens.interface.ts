import { RefreshToken } from './refresh-token.interface';

export interface Tokens {
    /** Access Token */
    accessToken: string;
    /** Refresh Token */
    refreshToken: RefreshToken;
}
