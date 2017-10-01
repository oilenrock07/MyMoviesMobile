import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  menus: Array<{title: string, component:any}>;

  constructor(public platform: Platform, 
    public menu: MenuController,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private sqlite: SQLite) {

      this.initializeApp();

      this.menus = [
        { title: 'Horror', component: HomePage },
        { title: 'Comedy', component: HomePage },
        { title: 'Action', component: HomePage },
        { title: 'Drama', component: HomePage },
        { title: 'Thriller', component: HomePage }
      ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      window['sqlitePlugin'].openDatabase({name: 'mymovies.db', location: 'default', createFromLocation: 1}, function(db) {
        db.transaction(function(tx) {
          db.executeSql("SELECT * FROM Movies WHERE MovieId=232", [], function (resultSet) {
            alert(JSON.stringify(resultSet.rows.item(0)));
            //console.log('got stringlength: ' + resultSet.rows.item(0).stringlength);
          }, function(error) {
            alert('SELECT error: ' + error.message);
          });
        }, function(err) {
          alert('Open database ERROR: ' + JSON.stringify(err));
        });
      });
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

