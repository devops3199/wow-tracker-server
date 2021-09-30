export class User {
    email: string;
    name: string;
    password: string;

    constructor(args: { email: string; name: string; password: string; }) {
        this.email = args.email;
        this.name = args.name;
        this.password = args.password;
    }
}