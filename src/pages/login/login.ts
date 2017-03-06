import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { Facebook, NativeStorage } from 'ionic-native';

import { ProfilePage } from '../profile/profile';

import { FacebookService } from '../../providers/facebook';

import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [FacebookService]
})
export class LoginPage {
  
  authResponse: any;
  isLogged: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public facebookService: FacebookService, public platform: Platform, public modalCtrl: ModalController) {
	  this.platform.ready().then(() => {
		this.isLogged = false;
		this.facebookService.init();
	  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
	let permissions = new Array<string>();
    let nav = this.navCtrl;
	permissions = ["public_profile"];
		
	Facebook.login(permissions).then((response) => {
	  let userId = response.authResponse.userID;
      let params = new Array<string>();

      Facebook.api("/me?fields=name,gender", params)
      .then(function(profile) {
        profile.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        NativeStorage.setItem('profile',
        {
          name: profile.name,
          gender: profile.gender,
          picture: profile.picture
        })
        .then(function(){
        }, function (error) {
          console.log(error);
        })
      })
	  
	  alert('Logged in Successfully!');
      alert(JSON.stringify(response.authResponse));
	  this.authResponse = response.authResponse;
	  this.isLogged = true;
    }, (error) => {
      alert(error);
	  console.log(error);
    });
  }
  
  post() {
	Facebook.showDialog({
		method: "share"
	});
  }

  getBirthday() {
	  Facebook.getLoginStatus().then((response) => {
      if(response.status == 'connected') {
        Facebook.api("me/?fields=id,birthday", ["user_birthday"]).then((data)=>{
          alert(JSON.stringify(data));
        }, (error) => {
          alert(error);
        })
      }
      else {
        alert('Logged in Failed');
      }
    })
  }
  
  publishPhoto() {
	  Facebook.showDialog({
		method: "share",
		picture:'https://images-na.ssl-images-amazon.com/images/I/51%2BVlDDzumL.jpg',
		name:'Sample Post',
		message:'My First Photo Post',
		caption: 'Phonegap Plugin Testing',
		description: 'Testing the Plugin'
	  });
  }
  
  getDetails() {
	var self = this;
    Facebook.getLoginStatus().then((response) => {
      if(response.status == 'connected') {
        Facebook.api('/' + response.authResponse.userID + '?fields=id,name,gender',[]).then((response)=>{
          alert(JSON.stringify(response));
		  
		  let addModal = self.modalCtrl.create(ProfilePage);
		  addModal.present();
        }, (error) => {
          alert(error);
        })
      }
      else {
        alert('Logged in Failed');
      }
    })
  }
  
  logout() {
    Facebook.logout().then((response) =>{
      alert(JSON.stringify(response));
	  this.isLogged = false;
    }, (error) => {
      alert(error);
    })
  }
}
