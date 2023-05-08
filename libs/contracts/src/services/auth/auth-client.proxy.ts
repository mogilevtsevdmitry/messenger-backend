import { AuthControllerNamespace } from './auth-controller.proxy';

export namespace AuthClient {
    export const Name = 'AUTH_SERVICE';
    export const AuthController = AuthControllerNamespace;
}