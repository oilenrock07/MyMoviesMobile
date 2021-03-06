import { WatchList } from '.././models/watchlist';

export interface IWatchListService {
    loadWatchList(): Promise<WatchList[]>;
    addWatchList(name: string, description: string) : Promise<number>;
    deleteWatchList(id: number);
}