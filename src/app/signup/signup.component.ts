import { Component, ViewChild } from '@angular/core';
import { NgForm,NgModel } from '@angular/forms';
import { PhoneComponent } from '../phone/phone.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhoneFieldComponent } from "../phone-field/phone-field.component";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule, CommonModule, PhoneComponent, PhoneFieldComponent],
  standalone: true,
})
export class SignupComponent {
  public email = '';
  public isFormValid = true;

  @ViewChild(PhoneComponent, { static: true })
  phoneComponent!: PhoneComponent;

  validateForm() {
    // Reset form validity
    this.isFormValid = true;

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.email.match(emailPattern)) {
      this.isFormValid = false;
      alert('Please enter a valid email address.');
    }

    // Validate phone number using the PhoneNewComponent
    this.phoneComponent.validateAndFormatPhoneNumber();
    if (!this.phoneComponent.isValid) {
      this.isFormValid = false;
      alert('Please enter a valid phone number.');
    }

    // If the form is valid, proceed with submission or next steps
    if (this.isFormValid) {
      alert('Form is valid. Proceeding...');
      // Proceed with form submission or next steps
    }
  }
  // email: string;
  phoneValidationResult: any;

  handlePhoneValidation(event: any) {
    this.phoneValidationResult = event;
    console.log('Phone Validation Result:', event);
  }

  onSubmit() {
    if(this.phoneComponent.isValid == true)
    console.log('Email:', this.email);
    console.log('Phone Validation Result:', this.phoneValidationResult);

    // Perform form submission logic
  }
}
