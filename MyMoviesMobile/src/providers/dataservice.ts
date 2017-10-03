import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

    db: any;
    isConnected: boolean = false;

    connect(): Promise<any> {
        var self = this;
        return new Promise((resolve, reject) => {
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
                reject(error);
            });
        });
    }
}