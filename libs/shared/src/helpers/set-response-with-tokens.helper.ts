import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Tokens } from '@shared/interfaces';
import { Response } from 'express';

export function setResponseWithTokens(tokens: Tokens, res: Response, REFRESH_TOKEN: string): void {
    if (!tokens) {
        throw new UnauthorizedException();
    }
    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(tokens.refreshToken.exp),
        secure: this.configService.get('NODE_ENV') === 'production',
    });
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
}
