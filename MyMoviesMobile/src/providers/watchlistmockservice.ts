import { Injectable } from '@angular/core';
import { WatchList } from '.././models/watchlist';
import { IWatchListService } from '../interfaces/iwatchlistservice'

@Injectable()
export class WatchListMockService implements IWatchListService {
    //for testing only
    watchList: Array<any> = [];

    constructor() {

        this.watchList.push({
            WatchListId: 1,
            Name: 'My Horror',
            Description: 'Best ghost horror movies'
        });

        this.watchList.push({
            WatchListId: 1,
            Name: 'Best Filipino Indie Movies',
            Description: 'Indies'
        });        
    }

    
    loadWatchList() : Promise<WatchList[]> {
        return new Promise((resolve, reject) => {
            // resolve(this.watchList.map(function(wl) {
            //     return new WatchList(wl.WatchListId, wl.Name, wl.Description);
            // }));
            resolve(this.mapMovie(this.watchList));
        });
    }

    addAddWatchList(name: string, description: string) : Promise<number> {
        return new Promise((resolve, reject) => {            
            var newId = Math.max.apply(Math,this.watchList.map(function(o){return o.WatchListId;})) + 1;
            this.watchList.push({
                WatchListId: newId,
                Name: name,
                Description: description
            });

            resolve(newId);
        });
    }


    private mapMovie(watchListObj: any): Array<WatchList> {
        var watchList: Array<WatchList> = [];
        try {
            for (let wl of watchListObj) {
                watchList.push(wl);
            }
        }
        catch (ex) {
            alert('Error mapping watchlist: ' + ex);
        }
        return watchList;
    }
}