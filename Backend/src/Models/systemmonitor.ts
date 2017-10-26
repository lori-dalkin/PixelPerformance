import {LogItem } from "./logitem";

export class SystemMonitor{

    private logItems :LogItem[] = new Array<LogItem>();

    public add(id: String, date: Date, description: String, token: String): void {
        this.logItems.push(new LogItem(id, date, description, token));
    }

    public async findAll(id: String): Promise<LogItem[]> {
        var records = new Array<LogItem>();

        for (let i = 0; i <this.logItems.length; i ++){
            if (this.logItems[i].getUserId() == id){
                records.push(this.logItems[i]);
            }
        }

        return records;
    }

}