import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {

  displayText: String  = "XXX";

  constructor(public navCtrl: NavController, private ble: BLE) {



    this.displayText += "<br> inceput de constructor<br> \r\n";
    ble.scan([], 60).subscribe(
      device => {
        this.displayText += "<br> Found device: " + JSON.stringify(device) +"<br> \r\n";
        ble.connect(device.id).subscribe(
          conSuccess => {
            this.displayText += "<br> con succcess: " + JSON.stringify(conSuccess) +"<br> \r\n";
            if (conSuccess.properties[0]=="Read")
            ble.read(device.id, conSuccess.service, conSuccess.characteristic).then(
              success =>  {this.displayText += "<br> success reading serv: " + JSON.stringify(success) +"<br> \r\n";},
              err => {this.displayText += "<br> err reading serv: " + JSON.stringify(err) +"<br> \r\n";}
            );
          },
          conFailure => {this.displayText += "<br> con error: " + JSON.stringify(conFailure) +"<br> \r\n ";},
          () => {this.displayText += "<br> con complete<br> \r\n ";}
        );
      },
      err => {
        this.displayText += "<br> Error occurred during BLE scan: " + JSON.stringify(err) + "<br> \r\n";
      },
      () => {
        this.displayText += "<br> End of devices...<br> \r\n";
      }
      );
      
      this.displayText += "<br> sf de constructor<br> \r\n";
  }

}
