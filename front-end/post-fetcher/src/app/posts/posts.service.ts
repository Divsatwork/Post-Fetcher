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

    savePost(value: string) {
        return this.http.post(this.localAddress + 'save', { "text": value });
    }

    upvotePost(id: string) {
        return this.http.post(this.localAddress + 'upvote', { 'id': id });
    }
}
