import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchPage } from '../search/search';
import { CategoryPage } from '../category/category';

@Component({
    selector: 'page-categories',
    templateUrl: 'categories.html'
})
export class CategoriesPage {
    constructor(public navCtrl: NavController) {

    }

    selectCategory(type: string) {
        this.navCtrl.push(CategoryPage, { type: type });
    }

    searchToggle() {
        this.navCtrl.push(SearchPage);
    }
}
