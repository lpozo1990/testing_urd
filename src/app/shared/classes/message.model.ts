export class Message {

    constructor(
        public user_id?: any,
        public order?: string,
        public from_message?: string,
        public to_message?: string,
        public read?: number,
        public creado?: string,
        public id?: string
    ) { }

}