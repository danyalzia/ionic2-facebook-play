import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  profile: any;
  userIsReady: boolean = false;

  constructor(public navCtrl: NavController, public view: ViewController) {}

  ionViewCanEnter(){
    let self = this;
    NativeStorage.getItem('profile')
    .then((data) => {
      self.profile = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
        self.userIsReady = true;
    }, (error) => {
      console.log(error);
    });
  }

  logout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then((response) => {
      NativeStorage.remove('profile');
      nav.push(LoginPage);
    }, (error) => {
      console.log(error);
    });
  }
  
  close(){
		this.view.dismiss();
  }
}
