import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [Storage]
})

export class ProfilePage {
  hasEmptyField: Boolean;
  isPropertyOwner: String;
  familyMembers: Number;
  ownsProperty: String;
  pragueIdentify: String;
  pesticidesUsage: String;
  propertyLevel: Number;

  constructor(public navCtrl: NavController, public alerCtrl: AlertController, private storage: Storage) {
    this.storage = storage;
    
  }

  ionViewDidLoad() {
    if(this.storage.get('survey')) {
      this.storage.get('survey').then((data) => {
        console.log(data);
        if(!data || !data.isPropertyOwner || !data.familyMembers || !data.ownsProperty ||
           !data.pragueIdentify || !data.pesticidesUsage || !data.propertyLevel) {
             this.hasEmptyField = true;
        }
        else {
          //property owner
          switch(data.isPropertyOwner) {
            case "owner":
              this.isPropertyOwner = "Proprietário";
              break;
            case "lease":
              this.isPropertyOwner = "Arrendatário";
              break;
            case "other":
              this.isPropertyOwner = "Outro";
              break;
          }

          // family members
          this.familyMembers = data.familyMembers;

          // owns property
          switch(data.ownsProperty) {
            case "yes":
              this.ownsProperty = "Sim";
              break;
            case "no":
              this.ownsProperty = "Não";
              break;
          }

          //prague identify
          switch(data.pragueIdentify) {
            case "yes":
              this.pragueIdentify = "Sim";
              break;
            case "no":
              this.pragueIdentify = "Não";
              break;
          }

          //pesticides usage
          switch(data.pesticidesUsage) {
            case "yes":
              this.pesticidesUsage = "Sim";
              break;
            case "no":
              this.pesticidesUsage = "Não";
              break;
          }

          // property level
          this.propertyLevel = data.propertyLevel;
        }
      });
    }
  }

  cleanLocalStorage(event) {
    let confirm = this.alerCtrl.create({
      title: 'Atenção!',
      message: 'Deseja excluir os dados salvos?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Agree clicked');
            // do exclude
            this.storage.remove('survey').then(() => {
              console.log('Keys have been removed');
            });
            this.navCtrl.setRoot(Home);
          }
        }
      ]
    });
    confirm.present();
  }

}
