import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpiGameModule } from './modules/game/game.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SpiGameModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
