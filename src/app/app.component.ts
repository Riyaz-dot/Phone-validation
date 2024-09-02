import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhoneComponent } from "./phone/phone.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostListComponent } from "./post-list/post-list.component";
import { HeroComponent } from "./hero/hero.component";
import { SignupComponent } from './signup/signup.component';
import { PhoneFieldComponent } from './phone-field/phone-field.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule,PhoneFieldComponent, PostListComponent, HeroComponent, PhoneComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
clikcount() {
this.count++;
console.log(this.count*8);

}
@Output() testing = new EventEmitter<string[]>();

  carlist: string[] = ['suzuki', 'kia', 'benz', 'audi', 'hundai']
  title = 'angular-apps';
  img: string ='';
  key: boolean = true;
  isactive: boolean = true;
 count:number= 0;
 collections=[
  'abc',
  'bca',
  'cbc'
 ]
 emittest(){
  this.testing.emit(this.collections)
  console.log(this.collections,'from app');
  
 }

 cartreAT(carName: string) {
  console.log(carName, 'new_details');
  
 }
value ='Randomtest'
  callPhone(arg0: string) {
  throw new Error('Method not implemented.');
  }
}
