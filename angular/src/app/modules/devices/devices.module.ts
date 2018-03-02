import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './devices.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceListItemComponent } from './device-list-item/device-list-item.component';
import { DeviceFormComponent } from './device-form/device-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [DevicesComponent, DeviceListComponent, DeviceListItemComponent, DeviceFormComponent]
})
export class DevicesModule { }
