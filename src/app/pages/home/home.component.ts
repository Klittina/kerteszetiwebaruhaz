import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
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
