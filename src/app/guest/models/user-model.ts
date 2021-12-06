import { Role } from "./role-enum";

export class User{
    id: number | undefined;
    fullName: string ="";
    username: string = "";
    password: string ="";
    role : Role = Role.USER;
}