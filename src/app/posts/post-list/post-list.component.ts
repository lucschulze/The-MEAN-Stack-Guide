import { Component, Input } from '@angular/core';
import { Post } from "../post.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  // posts = [
  //     {title: 'title1', content:'content post1'},
  //     {title: 'title2', content:'content post2'},
  //     {title: 'title3', content:'content post3'}]

  @Input() 
  posts: Post[] = []

}
