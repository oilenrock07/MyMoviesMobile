import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {
    public MaximumMovieRequest: number = 30;
    public SlideLimit: number = 500; //500 slides meaning 1500 movies
    constructor() {
    }
}