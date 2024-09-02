import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhoneNumberFormat, PhoneNumberType, PhoneNumberUtil } from 'google-libphonenumber';

@Component({
  selector: 'app-phone-field',
  standalone: true,
  imports: [FormsModule,CommonModule], 
  templateUrl: './phone-field.component.html',
  styleUrl: './phone-field.component.css'
})
export class PhoneFieldComponent {
  public phoneNumber = '';
  public isValid = false;
  public formattedNumber = '';
  public numberType = '';

  @Output() phoneValidationResult = new EventEmitter<any>();

  private phoneUtil: PhoneNumberUtil = PhoneNumberUtil.getInstance();
  public isValidPhone: boolean = true;
  public isPossible: boolean = false;
  public isTollFree: boolean = false;


  @Output() phoneValidated = new EventEmitter<any>();

  public validatePhoneNumber() {
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(this.phoneNumber, 'US'); // Default region can be changed as needed
      this.isValidPhone = this.phoneUtil.isValidNumber(number);
      this.isPossible = this.phoneUtil.isPossibleNumber(number);
      this.isTollFree = this.phoneUtil.getNumberType(number) === PhoneNumberType.TOLL_FREE;
      this.formattedNumber = this.phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL);
      this.numberType = this.getNumberTypeDescription(this.phoneUtil.getNumberType(number));
      this.numberType = PhoneNumberType[this.phoneUtil.getNumberType(number)];
      this.phoneValidated.emit({
        isValid: this.isValidPhone,
        formattedNumber: this.formattedNumber,
        isPossible: this.isPossible,
        isTollFree: this.isTollFree,
        numberType: this.numberType
      });
    } catch (error) {
      console.error('Error parsing or validating number:', error);
      this.isValidPhone = false;
      this.formattedNumber = '';
      this.isTollFree = false;
      this.numberType = 'Invalid';
      this.phoneValidated.emit({
        isValid: false,
        formattedNumber: '',
        isPossible: false,
        isTollFree: false,
        numberType: 'Invalid'
      });
    }
  }

  private getNumberTypeDescription(numberType: PhoneNumberType): string {
    switch (numberType) {
      case PhoneNumberType.MOBILE:
        return 'Mobile';
      case PhoneNumberType.FIXED_LINE:
        return 'Fixed Line';
      case PhoneNumberType.TOLL_FREE:
        return 'Toll Free';
      case PhoneNumberType.PREMIUM_RATE:
        return 'Premium Rate';
      default:
        return 'Unknown';
    }
  }

}
