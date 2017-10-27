export class LogItem {

    private userId : String;
    private timeStamp : Date;
    private description : String;
    private token : String;

    constructor(userId : String, timeStamp : Date, description : String, token : String){
        this.userId = userId;
        this.timeStamp = timeStamp;
        this.description = description;
        this.token = token;
    }

    public getUserId(): String {return this.userId;}
    public getTimeStamp(): Date {return this.timeStamp;}
    public getDescription(): String {return this.description;}
    public getToken(): String {return this.token;}

    public setUserId(userId : String): void {
        this.userId = userId;
    }

    public setTimeStamp(timeStamp : Date): void {
        this.timeStamp = timeStamp;
    }

    public setDescription(description : String): void {
        this.description = description;
    }

    public setToken(token : String): void {
        this.token = token;
    }
} 