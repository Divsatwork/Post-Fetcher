import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Posts } from './posts.module';

@Injectable()
export class PostsService {
    localAddress: string;

    constructor(private http: HttpClient) {
        this.localAddress = 'http://localhost:8080/';
    }

    getPosts() {
        return this.http.get(this.localAddress);
    }

    savePost(postData: Posts) {
        return this.http.post(this.localAddress + 'save', postData).subscribe();
    }
}
