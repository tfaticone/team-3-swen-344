import { Component, OnInit } from '@angular/core';
import { DevicesService } from './devices.service';
import { Device } from './device';

declare var $;

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [DevicesService]
})
export class DevicesComponent implements OnInit {

  devices: Device[] = [];

  constructor(private devicesService: DevicesService) {
  }

  ngOnInit() {
    this.devicesService.getAllDevices().subscribe(
      devices => {
        this.devices = devices;
      }
    );
  }

  onCreateDevice(newDevice){
    this.devicesService.createDevice(newDevice).subscribe(
      devices => {
        location.reload();
        //this.devices = devices;
      }
    );
  }

  onEditDevice(device){
    console.log(device);
    this.devicesService.editDevice(device).subscribe(
      devices => {
        location.reload();
        //this.devices = devices;
      }
    );
  }

  onDeleteDevice(device) {
    this.devicesService.deleteDevice(device).subscribe(
      devices => {
        //this.devices = devices;
      }
    );
    location.reload();
    //this.devices = this.devices.filter(d => d.id !== device.id);

  }

}
