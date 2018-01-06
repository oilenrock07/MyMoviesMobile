import { Component, AfterViewInit } from '@angular/core';
import { ModalController, NavController, AlertController, NavParams, ViewController } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { AppService } from '../../providers/appservice';
import { WatchListMockService } from '../../providers/watchlistmockservice';
import { IWatchListService } from '../../interfaces/iwatchlistservice';
import { WatchList } from '../../models/watchlist';

@Component({
    selector: 'page-watchlist',
    templateUrl: 'watchlist.html'
})
export class WatchListPage {

    public watchList: Array<WatchList>;
    private watchListService: IWatchListService;

    constructor(private navCtrl: NavController, private alertCtrl: AlertController, private appservice: AppService,
        private watchListMockService: WatchListMockService, public modalCtrl: ModalController) {
        //this.watchListService = appservice.isApp ? moviesService : movieMockService;
        this.watchListService = watchListMockService;
        this.watchListService.loadWatchList().then(result => {
            this.watchList = result;
        });
    }

    addWatchList() {
        let modal = this.modalCtrl.create(ModalWatchListPage, null);
        modal.onDidDismiss(data => {
            if (data != null)
                this.watchList.push(data);
        });
        modal.present();
    }

    deleteWatchList(wl: WatchList) {
        let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this watchlist?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel'
                },
                {
                    text: 'Yes',
                    handler: () => {
                        var promise = this.watchListService.deleteWatchList(wl.WatchListId);
                        promise.then(result => {
                            var removeIndex = this.watchList.map(function (item) { return item.WatchListId; }).indexOf(wl.WatchListId);
                            this.watchList.splice(removeIndex, 1);
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    searchToggle() {
        this.navCtrl.push(SearchPage);
    }
}



@Component({
    templateUrl: 'modalwatchlist.html'
})
export class ModalWatchListPage {
    public name: string;
    public description: string;
    private watchListService: IWatchListService;

    constructor(public viewCtrl: ViewController, private appservice: AppService,
        private watchListMockService: WatchListMockService) {
        this.watchListService = watchListMockService;
    }

    createWatchList() {

        if (!this.name) {
            alert('Watchlist Name is required');
            return;
        }

        this.watchListService.addWatchList(this.name, this.description).then(result => {
            var watchList = new WatchList(result, this.name, this.description);
            this.viewCtrl.dismiss(watchList);
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
