import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class AppService {
    public isApp: boolean = false;

    constructor(private platform: Platform) {
        if(this.platform.is('core') || this.platform.is('mobileweb')) {
            this.isApp = false;
          } else {
            this.isApp = true;
          }
    }
}