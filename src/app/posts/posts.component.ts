import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { PostListComponent } from "../post-list/post-list.component";

@Component({
    selector: 'app-posts',
    standalone: true,
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.css',
    imports: [PostListComponent]
})
export class PostsComponent implements OnInit{
  title = 'navbar';
  number = 23;
  @Input() fromparent: string | undefined;
  @Input() fromparent2: number | undefined;

  postoutputmessage = "post comp values"; 
  message = 'from post component';

  @Output() messageEvent = new EventEmitter();

  ngOnInit(){
    
  }

  sendmessage(event: MouseEvent){
    if(event.shiftKey){
      console.log('shiftyyyyy')
    }
    this.messageEvent.emit(this.postoutputmessage);
    // console.log();
    
  }
}
