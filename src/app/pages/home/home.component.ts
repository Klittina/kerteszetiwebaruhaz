import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ngOnInit() {
    let index = 0;
    const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
    setInterval(() => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      index = (index + 1) % slides.length;
    }, 3000); // 5 mp-enként vált
  }

}
