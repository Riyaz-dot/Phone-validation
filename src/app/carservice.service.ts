import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarserviceService {

  constructor() { }

  onSubscribed(type: string){


    alert('hurray......'+type+'subscriptions is done')
  }
}
