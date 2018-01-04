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
        modal.present();
    }

    searchToggle() {
        this.navCtrl.push(SearchPage);
    }
}



@Component({
    templateUrl: 'modalwatchlist.html'
})
export class ModalWatchListPage {
    character;

    constructor(
        public params: NavParams,
        public viewCtrl: ViewController
    ) {
        var characters = [
            {
                name: 'Gollum',
                quote: 'Sneaky little hobbitses!',
                image: 'assets/img/avatar-gollum.jpg',
                items: [
                    { title: 'Race', note: 'Hobbit' },
                    { title: 'Culture', note: 'River Folk' },
                    { title: 'Alter Ego', note: 'Smeagol' }
                ]
            },
            {
                name: 'Frodo',
                quote: 'Go back, Sam! I\'m going to Mordor alone!',
                image: 'assets/img/avatar-frodo.jpg',
                items: [
                    { title: 'Race', note: 'Hobbit' },
                    { title: 'Culture', note: 'Shire Folk' },
                    { title: 'Weapon', note: 'Sting' }
                ]
            },
            {
                name: 'Samwise Gamgee',
                quote: 'What we need is a few good taters.',
                image: 'assets/img/avatar-samwise.jpg',
                items: [
                    { title: 'Race', note: 'Hobbit' },
                    { title: 'Culture', note: 'Shire Folk' },
                    { title: 'Nickname', note: 'Sam' }
                ]
            }
        ];
        this.character = characters[0];
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
