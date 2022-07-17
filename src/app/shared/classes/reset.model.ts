export class FormResetPassword {

    constructor(
        public email: string,
        public password: string,
        public password_confirmation: string,
        public token: string
    ) { }

}