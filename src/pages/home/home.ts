import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private ble: BLE) {
    console.log("inceput de constructor");
    ble.scan([], 60).subscribe(
      device => {
      console.log("Found device: " + JSON.stringify(device));
      },
      err => {
      console.log("Error occurred during BLE scan: " + JSON.stringify(err));
      },
      () => {
      console.log("End of devices...");
      }
      );
      
    console.log("sf de constructor");
  }

}
