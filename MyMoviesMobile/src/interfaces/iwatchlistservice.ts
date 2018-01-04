import { WatchList } from '.././models/watchlist';

export interface IWatchListService {
    loadWatchList(): Promise<WatchList[]>;
    addAddWatchList(name: string, description: string) : Promise<number>;
}