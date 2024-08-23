import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from "../app.component";
import { CarserviceService } from '../carservice.service';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AppComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  providers: [CarserviceService]
})



export class PostListComponent {

  @Input() frompost: string | undefined;
  @Input() parentAPP:  string | undefined;
  @Input() parentno: number | boolean | undefined;
  @Input() cars = [];

  @Output() caradded = new EventEmitter<string>();
  constructor(private carService: CarserviceService) { }

  childvalue = 'some childs';
  carName = 'fords';


  subscribe()
  {
    // let carService = new onSubscribed()
    this.carService.onSubscribed('monthly');
  }

  onSubmit() {
  console.log(this.carName);
  this.caradded.emit(this.carName)
    this.subscribe();
  }
  // showemit(title:any){
  //   console.log(title,'from post list');
  
  // }


}
