import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Network } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Home } from '../home/home';
//import { Database } from '../../app/app.database.ts';

@Component({
  selector: 'page-survey',
  templateUrl: 'survey.html',
  providers: [Storage]
})

export class Survey {
  /* Model Driven Forms - easier to unit test validation 
   * Thanks to Functional Reactive Programming way
   */
  form: FormGroup;
  networkStatus: boolean = true;

  constructor(public alerCtrl: AlertController, public navCtrl: NavController, 
              public toastCtrl: ToastController, public navParams: NavParams,
              public formBuilder: FormBuilder, private storage: Storage) {
    
    // localstorage 
    this.storage = storage;

    // to do: validate through RegEX pattern
    this.form = formBuilder.group({
      "isPropertyOwner": ["", Validators.required],
      "familyMembers": ["", Validators.compose([Validators.required, Validators.minLength(0)])],
      "ownsProperty": ["", Validators.required],
      "pragueIdentify": ["", Validators.required],
      "pesticidesUsage": ["", Validators.required],
      "propertyLevel": ["", Validators.required]
    });

    /* Check if form has been changed */
    this.form.valueChanges.subscribe(data => {
      if(data) {
        this.storage.set('survey', data)
      } else this.form.get('propertyLevel').setValue(1);
    });

    /* Check if it's online/offline */
    let disconnectSubscription = Network.onDisconnect().subscribe(() => {
      // when it's offline
      const toast = this.toastCtrl.create({
        message: 'Oops.. você está offline! Aguardando conexão para habilitar o envio do formulário.',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 3000
      });
      toast.present();
      this.networkStatus = false;
    });

    let connectSubscription = Network.onConnect().subscribe(() => {
     // Do something when it's online :) 
        const toast = this.toastCtrl.create({
          message: 'Você está online!',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 2000
        });
        toast.present();
        this.networkStatus = true;
    });

  }
  
  hasConnection() {
    if (!this.networkStatus) {
      return true
    }
    else return false;
  }

  ngAfterViewInit() {
    // checking if there's something saved, then...
    if(this.storage.get('survey')) {
      this.storage.get('survey').then((data) => {
        if(data) {
          this.form.get('isPropertyOwner').setValue(data.isPropertyOwner);
          this.form.get('familyMembers').setValue(data.familyMembers);
          this.form.get('ownsProperty').setValue(data.ownsProperty);
          this.form.get('pragueIdentify').setValue(data.pragueIdentify);
          this.form.get('pesticidesUsage').setValue(data.pesticidesUsage);
          this.form.get('propertyLevel').setValue(data.propertyLevel);
        }
        else if (!data) this.form.get('propertyLevel').setValue(1);
      });
    }

    let alert = this.alerCtrl.create({
      title: 'Bem-vindo!',
      message: 'Após completar o questionário, você receberá um mapa com recomendações para melhorar seu sistema de produção',
      buttons: ['Ok']
    });
    alert.present()
  }


  onSubmit(form) {
    console.log("model-based form submitted");
    console.log(form);
    /*this.storage.clear().then(() => {
      console.log('Keys have been cleared');
    });*/
    let alert = this.alerCtrl.create({
      title: 'Enviado!',
      message: 'Confira agora em seu perfil sua avaliação.',
      buttons: ['Ok']
    });
    alert.present()

    this.navCtrl.setRoot(Home);
  }
}

