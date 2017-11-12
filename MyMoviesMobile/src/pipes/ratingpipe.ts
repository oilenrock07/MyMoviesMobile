import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'rating',
    pure: false
})
export class RatingPipe implements PipeTransform {
    sanitizer: any;
    strRate: string = '';

    constructor(private domSanitizationService: DomSanitizer) {
        this.sanitizer = domSanitizationService;
    }

    transform(value: any): string {
        var rating: number = Number(value);
        var roundedRate: number = Math.round(rating);
        if (roundedRate > 0 && this.strRate.length == 0) {
            var found: boolean = false;

            for (var i = 5; i > 0; i--) {
                var num = i * 2;
                if (roundedRate >= num) {
                    if (!found && roundedRate > num)
                        this.strRate = '<ion-icon class="ion-ios-star-half"></ion-icon>' + this.strRate;
                    else
                        this.strRate = '<ion-icon class="ion-ios-star"></ion-icon>' + this.strRate;
                    found = true;
                }
                else {
                    if (!found && roundedRate == num - 1) {
                        this.strRate = '<ion-icon class="ion-ios-star-half"></ion-icon>' + this.strRate;
                        found = true;
                    }
                    else
                        this.strRate = '<ion-icon class="ion-ios-star-outline"></ion-icon>' + this.strRate;
                }
            }
        }

        return this.sanitizer.bypassSecurityTrustHtml(this.strRate);
    }
}