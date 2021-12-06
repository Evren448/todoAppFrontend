import { Status } from "./status-enum";

export class Todo{
    id : number = 0;
    description : string = "";
    status : Status = Status.TODO
    fdate : Date = new Date();
    createdDate : Date = new Date();
    user_id : number | undefined;
    fullName : string = "";
}