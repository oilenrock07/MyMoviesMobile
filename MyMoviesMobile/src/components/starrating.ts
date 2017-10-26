import { Component, Input } from '@angular/core';
import { RatingPipe } from '../pipes/ratingpipe';

@Component ({
    selector: 'mov-star-rating',
    inputs: ['rate'],
    template: '<div [innerHtml]="rate | rating"></div>'
})
export class StarRating {
    @Input() rate: string = '';
    rateNumber: string = '';

    constructor() {
        
    }

    ngOnInit() {

    }
}
