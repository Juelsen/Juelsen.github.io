import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-screen',
  templateUrl: './first-screen.component.html',
  styleUrls: ['./first-screen.component.scss']
})
export class FirstScreenComponent {
  private router = inject(Router);

  navigateToSecondScreen(): void {
    this.router.navigate(['second-screen']);
  }
}
