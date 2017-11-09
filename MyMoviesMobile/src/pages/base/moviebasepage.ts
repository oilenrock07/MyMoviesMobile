import { Component, AfterViewInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Movie } from '../../models/movie';

export class MovieBasePage {
    constructor(public alertCtrl: AlertController) {

    }

    addToWatchList(movie: Movie) {
        let alert = this.alertCtrl.create();
        alert.setTitle('Select watchlist you want it to add?');

        alert.addInput({
            type: 'checkbox',
            label: 'Alderaan',
            value: 'value1',
            checked: true
        });

        alert.addInput({
            type: 'checkbox',
            label: 'Bespin',
            value: 'value2'
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'Okay',
            handler: data => {
                console.log('Checkbox data:', data);
                // this.testCheckboxOpen = false;
                // this.testCheckboxResult = data;
            }
        });
        alert.present();
    }

}