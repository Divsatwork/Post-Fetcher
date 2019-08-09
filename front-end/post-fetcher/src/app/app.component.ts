import { Component } from '@angular/core';
import { Posts } from './posts/posts.module';
import { PostsService } from './posts/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loading: boolean;
  dataFetched: boolean;
  showError: boolean;
  posts: Posts[] = [];
  constructor(private postService: PostsService
  ) {
    this.loading = true;
    this.postService.getPosts().subscribe((res: Posts[]) => {
      if (res.length !== undefined) {
        this.posts = res;
        this.showError = false;
      } else {
        this.showError = true;
      }
    });
    this.loading = false;
  }

  submitPost(value: string): void {
    this.loading = true;
    const source = this.postService.savePost(value["text"]);
    source.subscribe((res) => {
      if (res['status']) {
        alert('Post saved successfully');
      } else {
        alert('Error while saving post data');
      }
      window.location.reload();
    }, err => {
      console.log('Error while fetching data from server!');
      this.showError = true;
    });
  }

}
