import { Component } from '@angular/core';
import { PhoneService } from '../phone.service';
import { PhoneNumberFormat } from 'google-libphonenumber';
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

  formatPhoneNumber(): void {
    if (this.phoneNumber && this.region) {
      this.formattedNumber = this.phoneService.formatPhoneNumber(this.phoneNumber, this.region, PhoneNumberFormat.INTERNATIONAL);
    } else {
      this.formattedNumber = 'Invalid input';
    }
  }

  validatePhoneNumber(): void {
    if (this.phoneNumber && this.region) {
      this.isValid = this.phoneService.isValidPhoneNumber(this.phoneNumber, this.region);
    } else {
      this.isValid = false;
    }
  }

  validatePhoneNumbers() {
    this.isPossible = this.phoneService.isPossibleNumber(this.phoneNumber, this.region);
    this.isTollFree = this.phoneService.isTollFreeNumber(this.phoneNumber, this.region);
    this.isMobile = this.phoneService.isMobileNumber(this.phoneNumber, this.region);
    this.numberType = this.phoneService.getNumberType(this.phoneNumber, this.region);
  }

  getRegionCode(): void {
    if (this.phoneNumber && this.region) {
      this.regionCode = this.phoneService.getRegionCodeForNumber(this.phoneNumber, this.region);
    } else {
      this.regionCode = 'Invalid input';
    }
  }
 

 

  runAllChecks() {
    this.formatPhoneNumber();
    this.validatePhoneNumber();
    this.getRegionCode();

    this.isPossible = this.phoneService.isPossibleNumber(this.phoneNumber, this.region);
    this.isTollFree = this.phoneService.isTollFreeNumber(this.phoneNumber, this.region);
    this.isMobile = this.phoneService.isMobileNumber(this.phoneNumber, this.region);
    this.numberType = this.phoneService.getNumberType(this.phoneNumber, this.region);
  }
}
