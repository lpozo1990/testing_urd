
export class User {

    constructor(
        public name: string,
        public lastname: string,
        public email: string,
        public password: string,
        public image?: string,
        public mobile_phone?: string,
        public picture?: string,
        public verified?: boolean,
        public activated?: boolean,
        public admin?: boolean,
        public id?: number
    ) { }

}
