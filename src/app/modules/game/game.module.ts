import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpiGameComponent } from './game.component';

@NgModule({
  declarations: [
    SpiGameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpiGameComponent
  ],
})
export class SpiGameModule { }
