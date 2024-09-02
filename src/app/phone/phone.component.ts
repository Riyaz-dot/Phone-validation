import { Component } from '@angular/core';
import { PhoneService } from '../phone.service';
import { PhoneNumberFormat, PhoneNumberType, PhoneNumberUtil } from 'google-libphonenumber';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})




export class PhoneComponent {
  phoneNumber: string = '';
  formattedNumber: string = '';
  isValid: boolean = false;
  regionCode: string = '';
  region: string = 'US'; 
 
  isPossible: boolean = false;
  isTollFree: boolean = false;
  isMobile: boolean = false;
  numberType: string = '';
  

  constructor(private phoneService: PhoneService) { }

  private phoneUtil = PhoneNumberUtil.getInstance();

  validateAndFormatPhoneNumber() {
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(this.phoneNumber, this.regionCode);
      this.isValid = this.phoneUtil.isValidNumber(number);
      this.isPossible = this.phoneUtil.isPossibleNumber(number);
      this.isTollFree = this.phoneUtil.getNumberType(number) === PhoneNumberType.TOLL_FREE;
      this.formattedNumber = this.phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL);
      this.numberType = this.getNumberTypeDescription(this.phoneUtil.getNumberType(number));
    } catch (error) {
      console.error('Error parsing or validating number:', error);
      this.isValid = false;
      this.formattedNumber = '';
      this.isTollFree = false;
      this.numberType = 'Invalid';
    }
  }

  getNumberTypeDescription(type: PhoneNumberType): string {
    switch (type) {
      case PhoneNumberType.MOBILE:
        return 'Mobile';
      case PhoneNumberType.FIXED_LINE:
        return 'Fixed Line';
      case PhoneNumberType.TOLL_FREE:
        return 'Toll-Free';
      case PhoneNumberType.VOIP:
        return 'VoIP';
      case PhoneNumberType.UNKNOWN:
      default:
        return 'Unknown';
    }
  }
}
