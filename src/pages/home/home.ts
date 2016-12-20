import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Survey } from '../survey/survey';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  formRoute(event) {
    this.navCtrl.setRoot(Survey);
  }
}
