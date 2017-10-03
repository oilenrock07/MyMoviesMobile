import { Component } from '@angular/core';
@Component ({
    selector: 'mov-img',
    template: '<img src="{{image}}" title="{{title}}" />'
})
export class ImageComponent {
    public title: string = "cawi";
    public image :string = "<img src=content://com.lychee.mymovies/main_expansion/tt0316654.jpg";
}