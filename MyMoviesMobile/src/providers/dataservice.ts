import { Injectable } from '@angular/core';
import { AppService } from './appservice';

@Injectable()
export class DataService {

    db: any;
    isConnected: boolean = false;

    constructor (private appService: AppService) {

    }

    connect(): Promise<any> {       
        var self = this;
        return new Promise((resolve, reject) => {
            if (this.isConnected) return resolve(self.db);
            if (!this.appService.isApp) resolve();
            window['sqlitePlugin'].openDatabase(
                {
                    name: 'mymovies.db',
                    location: 'default',
                    createFromLocation: 1
                }, function (db) {
                    self.db = db;
                    self.isConnected = true;
                    resolve(db);
                }, function (err) {
                    reject(err);
                });
        });
    }


    executeSql(query, param): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.executeSql(query, param, function (resultSet) {
                resolve(resultSet);
            }, function (error) {
                alert(JSON.stringify(error));
                reject(error);
            });
        });
    }
}