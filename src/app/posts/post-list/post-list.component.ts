import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { PostsService } from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  // posts = [
  //     {title: 'title1', content:'content post1'},
  //     {title: 'title2', content:'content post2'},
  //     {title: 'title3', content:'content post3'}]

posts: Post[] = [];
private postsSub: Subscription;

  constructor(public postsService: PostsService) {}
  
  ngOnInit(){
    this.postsService.getPosts();
    this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) =>{
          this.posts = posts;
      });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
