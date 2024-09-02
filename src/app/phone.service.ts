import { Injectable } from '@angular/core';
import { PhoneNumberUtil, PhoneNumberFormat, PhoneNumberType,  } from 'google-libphonenumber';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  getNumberType(phoneNumber: string, region: string): string {
    throw new Error('Method not implemented.');
  }
  formatNumber(phoneNumber: string, region: string): string {
    throw new Error('Method not implemented.');
  }
  private phoneUtil: PhoneNumberUtil;

  constructor() {
    this.phoneUtil = PhoneNumberUtil.getInstance();
  }

  formatPhoneNumber(phoneNumber: string, region: string, format: PhoneNumberFormat = PhoneNumberFormat.INTERNATIONAL): string {
    try {
      const number = this.phoneUtil.parse(phoneNumber, region);
      return this.phoneUtil.format(number, format);
    } catch (error) {
      console.error('Error parsing phone number', error);
      return phoneNumber;
    }
  }

  isValidPhoneNumber(phoneNumber: string, region: string): boolean {
    try {
      const number = this.phoneUtil.parse(phoneNumber, region);
      return this.phoneUtil.isValidNumber(number);
    } catch (error) {
      console.error('Error validating phone number', error);
      return false;
    }
  }

  getRegionCodeForNumber(phoneNumber: string, region: string): string {
    try {
      const number = this.phoneUtil.parse(phoneNumber, region);
      const regionCode = this.phoneUtil.getRegionCodeForNumber(number);
      return regionCode ?? 'default_region_code'; // Provide a default value if undefined
    } catch (error) {
      console.error('Error getting region code for phone number', error);
      return 'default_region_code'; // Provide a default value if an error occurs
    }
  }

  // Check if the number is possible
  isPossibleNumber(phoneNumber: string, region: string): boolean {
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(phoneNumber, region);
      return this.phoneUtil.isPossibleNumber(number);
    } catch (error) {
      console.error('Error parsing phone number:', error);
      return false;
    }
  }

  // Check if the number is toll-free
  isTollFreeNumber(phoneNumber: string, region: string): boolean {
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(phoneNumber, region);
      const numberType = this.phoneUtil.getNumberType(number);
      return numberType === libphonenumber.PhoneNumberType.TOLL_FREE;
    } catch (error) {
      console.error('Error parsing phone number:', error);
      return false;
    }
  }

  // Check if the number is a mobile number
  isMobileNumber(phoneNumber: string, region: string): boolean {
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(phoneNumber, region);
      const numberType = this.phoneUtil.getNumberType(number);
      console.log('Number Type:', numberType);  // Debugging output
      return numberType === PhoneNumberType.MOBILE;
    } catch (error) {
      console.error('Error parsing number:', error);
      return false;
    }
  }

}
