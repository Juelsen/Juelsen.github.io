import { Component, OnInit, inject } from '@angular/core';
import { Howl } from 'howler';
import { finalize, interval, map, take } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  styleUrls: ['./second-screen.component.scss']
})
export class SecondScreenComponent implements OnInit {
  private router = inject(Router);
  private readonly COUNTDOWN_SECONDS = 20;

  private timer$ = interval(1000).pipe(take(this.COUNTDOWN_SECONDS));
  private countdown$ = this.timer$.pipe(map(n => (this.COUNTDOWN_SECONDS-1) - n), finalize(() => this.SOUND.pause()));

  countdownSig = toSignal<number, number>(this.countdown$, { initialValue: this.COUNTDOWN_SECONDS });

  private readonly SOUND = new Howl({
    src: ['assets/audio/soundFireWebsite.mp3'],
  });

  ngOnInit(): void {
    this.SOUND.play();
  }

  navigateToThirdScreen(): void {
    this.router.navigate(['third-screen']);
  }
}
