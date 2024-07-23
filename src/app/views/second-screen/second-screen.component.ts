import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { finalize, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-second-screen',
  templateUrl: './second-screen.component.html',
  styleUrls: ['./second-screen.component.scss']
})
export class SecondScreenComponent implements OnInit {

  private readonly COUNTDOWN_SECONDS = 20;

  private timer$ = interval(1000).pipe(take(this.COUNTDOWN_SECONDS + 1));
  countdown$ = this.timer$.pipe(map(n => this.COUNTDOWN_SECONDS - n), finalize(() => this.SOUND.pause()));

  private readonly SOUND = new Howl({
    src: ['assets/audio/intro_audio.wav'],
  });

  ngOnInit(): void {
    this.SOUND.play();
  }
}
