import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        this.http.get<{ menssage: string, posts: any }>('http://localhost:3000/api/posts')
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id
                    }
                });
            }))
            .subscribe((postData) => {
                this.posts = postData.posts;
                this.postsUpdated.next([...this.posts]);
            })
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content };
        this.http.post<{ menssage: string }>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                console.log(responseData.menssage);
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });

    }
}