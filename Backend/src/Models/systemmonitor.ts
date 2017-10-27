import {LogItem } from "./logitem";

export class SystemMonitor{

    private logItems :LogItem[] = new Array<LogItem>();

    public logRequest(userId: String, description: String, tokenId: String): void {
        this.logItems.push(new LogItem(userId, new Date(), description, tokenId));
    }

    public getRecords(userId: String): LogItem[] {
        let records = new Array<LogItem>();

        for (let i = 0; i <this.logItems.length; i ++){
            if (this.logItems[i].getUserId() == userId){
                records.push(this.logItems[i]);
            }
        }

        return records;
    }

}