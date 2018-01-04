import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DataService } from '../providers/dataservice';
import { HomePage } from '../pages/home/home';
import { WatchListPage } from '../pages/watchlist/watchlist';
import { CategoriesPage } from '../pages/categories/categories';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  menus: Array<{ title: string, component: any, system: boolean }>;

  constructor(public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public dataService: DataService) {

    this.initializeApp();

    this.menus = [
      { title: 'Home', component: HomePage, system: false },
      { title: 'Categories', component: CategoriesPage, system: false },
      { title: 'Watchlist', component: WatchListPage, system: false },
      { title: 'Data Updates', component: HomePage, system: true },
      { title: 'Settings', component: HomePage, system: true },
      { title: 'About', component: HomePage, system: true }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  filterMenu(menu: { title: string, component: any, system: boolean }, value: boolean) {
    return menu.system == value;
  }
}

