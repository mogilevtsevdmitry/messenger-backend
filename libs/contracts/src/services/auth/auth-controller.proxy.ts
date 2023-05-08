import { LoginWithEmailNamespace, RegisterWithEmailNamespace } from './methods';

export namespace AuthControllerNamespace {
    /** Авторизация по email и паролю */
    export const LoginWithEmail = LoginWithEmailNamespace;
    /** Регистрация с помощью email и пароля */
    export const RegisterWithEmail = RegisterWithEmailNamespace;
}
