import { Component, inject, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-third-screen',
  templateUrl: './third-screen.component.html',
  styleUrls: ['./third-screen.component.scss']
})
export class ThirdScreenComponent implements OnInit, AfterViewInit {
  private router = inject(Router);

  navigateTofirstScreen(): void {
    this.router.navigate(['']);
  }
  fireMethods = [
    { title: '', description: '', imageUrl: '' },
    { title: 'Feuerbohren', description: 'Handbohrer und Bogenbohrer sind die Hauptmethoden beim Feuerbohren. Beim Handbohrer wird ein Holzstab zwischen den Händen gedreht und gegen ein Brett gedrückt, wodurch Reibung entsteht.Beim Bogenbohrer wird ein Bogen mit einer Schnur verwendet, um den Stab schneller zu drehen. Die Reibung erzeugt Hitze, die trockenen Zunder entzündet und somit Feuer erzeugt.', imageUrl: 'assets/friction.jpg' },
    { title: 'Feuersteinschlagen', description: 'Diese Methode umfasst Feuerstein und Pyrit sowie Feuerstein und Stahl. Ein Feuerstein wird gegen Pyrit oder Stahl geschlagen, wodurch Funken entstehen. Diese Funken werden in trockenes, leicht entzündbares Material (Zunder) geschlagen, das sich entzündet und ein Feuer entfacht.', imageUrl: 'assets/magnifying-glass.jpg' },
    { title: 'Feuerpflug', description: 'Beim Feuerpflug wird ein Holzstab schnell in eine Nut in einem anderen Stück Holz geschoben. Durch die schnelle Vorwärts- und Rückwärtsbewegung entsteht Reibungshitze. Diese Hitze entzündet trockenen Zunder, der in der Nut platziert ist, und erzeugt Feuer.', imageUrl: 'assets/lighter.jpg' },
    { title: 'Feuerzeug des Mittelalters', description: 'Beim Feuerzeug des Mittelalters handelt es sich um Zunderbüchsen. Diese enthalten Zunder, Feuerstein und Stahl. Funken werden durch das Schlagen des Feuersteins gegen den Stahl erzeugt. Diese Funken entzünden den Zunder, der in einer kleinen Box gehalten wird. Der entstehende Glutpunkt wird dann genutzt, um ein größeres Feuer zu entfachen.', imageUrl: 'assets/firestarter.jpg' },
    { title: 'Streichhölzer', description: 'Frühe Streichhölzer waren Holzspäne, die mit Chemikalien behandelt wurden und sich durch Reibung entzündeten. Sicherheitsstreichhölzer (wie wir sie heute kennen), erfunden im 19. Jahrhundert, enthalten Phosphor und entzünden sich nur an speziell behandelten Oberflächen. Die Reibung erzeugt genug Hitze, um die Chemikalien zu entzünden und eine Flamme zu erzeugen.', imageUrl: 'assets/battery-steel-wool.jpg' },
    { title: 'Mechanische Feuerzeuge', description: 'Ein Feuerkolben erzeugt Feuer durch schnelle Kompression eines Kolbens in einem Zylinder, wodurch Hitze entsteht, die Zunder entzündet. Ein Feuerstahl dreht ein Rad gegen einen Feuerstein, um Funken zu erzeugen, die trockenen Zunder entzünden und somit Feuer erzeugen.', imageUrl: 'assets/fire-bow.jpg' },
    { title: 'Moderne Feuerzeuge', description: 'Das BIC oder Clipper Feuerzeug kennst du ja, da kann ich mir die Erklärung sparen..', imageUrl: 'assets/chemical-reaction.jpg' },
  ];
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private particleCount = 50; // Weitere Reduzierung der Partikelanzahl
  private w = 0;
  private h = 0;
  private mouse = { x: 0, y: 0, isDown: false, lastX: 0, lastY: 0 };
  private lastScrollPosition = 0;
  private scrollThreshold = 10; // Schwellenwert für signifikante Scroll-Änderungen

  // Neue Variablen für GIF-Anzeige
  gifs: string[] = [
    'assets/gifs/1.gif',
    'assets/gifs/2.gif',
    'assets/gifs/3.gif',
    'assets/gifs/4.gif',
    'assets/gifs/5.gif',
    'assets/gifs/6.gif',
    'assets/gifs/7.gif',
    'assets/gifs/8.gif',
    'assets/gifs/9.gif',
    'assets/gifs/10.gif',
    'assets/gifs/11.gif',
    'assets/gifs/12.gif',
    'assets/gifs/13.gif',
    'assets/gifs/14.gif',
    'assets/gifs/15.gif',
    'assets/gifs/16.gif',
    'assets/gifs/17.gif',
    // Füge hier alle deine GIFs hinzu
  ];
  currentGif: string | null = null;
  gifPosition = { x: 0, y: 0 };

  ngOnInit() {}

  ngAfterViewInit() {
    this.initCanvas();
    this.animationLoop();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('scroll', () => this.onScroll());
    canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    canvas.addEventListener('mouseup', () => this.onMouseUp());
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.w = canvas.width = window.innerWidth;
    this.h = canvas.height = window.innerHeight;
  }

  private onScroll() {
    const newScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = newScrollPosition - this.lastScrollPosition;

    // Aktualisiere die Partikel nur bei signifikanten Scroll-Änderungen
    if (Math.abs(scrollDelta) > this.scrollThreshold) {
      this.lastScrollPosition = newScrollPosition;

      // Reduziere die Partikelanzahl basierend auf dem Scroll-Delta
      if (this.particles.length > this.particleCount) {
        this.particles.splice(this.particleCount);
      }

      this.particles.forEach(particle => {
        particle.update(this.mouse, scrollDelta);
      });
    }
  }

  private onMouseDown(event: MouseEvent) {
    this.mouse.isDown = true;
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
    this.mouse.lastX = this.mouse.x;
    this.mouse.lastY = this.mouse.y;
  }

  private onMouseUp() {
    this.mouse.isDown = false;
  }

  private onMouseMove(event: MouseEvent) {
    if (this.mouse.isDown) {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;
    }
  }

  private animationLoop() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.globalCompositeOperation = 'lighter';

    if (this.particles.length < this.particleCount) {
      this.particles.push(new Particle(this.w, this.h));
    }

    this.particles.forEach((particle, index) => {
      particle.update(this.mouse, 0); // Verwende 0 als scrollDelta, da wir es schon in onScroll behandeln
      particle.draw(this.ctx);
      if (particle.radius <= 0) {
        this.particles.splice(index, 1);
      }
    });

    requestAnimationFrame(() => this.animationLoop());
  }

  // Neue Methoden für GIF-Anzeige
  getRandomGif(): string {
    const randomIndex = Math.floor(Math.random() * this.gifs.length);
    return this.gifs[randomIndex];
  }

  onMouseEnterFire(event: MouseEvent): void {
    if (!this.currentGif) {
      this.currentGif = this.getRandomGif();
    }
    this.updateGifPosition(event);
  }

  onMouseLeaveFire(): void {
    this.currentGif = null;
  }

  onMouseMoveOverFire(event: MouseEvent): void {
    this.updateGifPosition(event);
  }

  private updateGifPosition(event: MouseEvent): void {
    this.gifPosition = { x: event.clientX, y: event.clientY };
  }
}

class Particle {
  x!: number;
  y!: number;
  radius!: number;
  hue!: number;
  baseY!: number;
  private baseRadius: number;
  private growthPaused: boolean = false;

  constructor(private w: number, private h: number) {
    this.reset();
    this.baseRadius = this.radius;
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Verwendung von Integer-Koordinaten
  }

  private reset() {
    this.x = 300 * 0.5 + this.getRandomInt(-10, 10);
    this.baseY = this.h * 0.5;
    this.y = 600 + this.getRandomInt(-10, 10);
    this.radius = 30;
    this.hue = this.getRandomInt(0, 40);
    this.growthPaused = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 55%, 0.5)`;
    ctx.fill();
    ctx.shadowColor = `hsla(${this.hue}, 100%, 55%, 1)`;
    ctx.shadowBlur = 15;
    ctx.closePath();
  }

  update(mouse: { x: number; y: number; isDown: boolean; lastX: number; lastY: number }, scrollDelta: number) {
    if (this.radius <= 0.5) {
      this.reset();
    } else {
      this.radius = Math.max(0, this.radius - 0.5);
      this.y -= 2;
      if (mouse.isDown) {
        const dx = mouse.x - mouse.lastX;
        const dy = mouse.y - mouse.lastY;
        this.x += dx * 0.1;
        this.y += dy * 0.1;
      }
      if (!this.growthPaused) {
        const spreadFactor = scrollDelta * 0.1;
        this.x += spreadFactor * this.getRandomInt(-1, 1);
        this.y += spreadFactor * -1;
      }
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    }
  }

  pauseGrowth() {
    this.growthPaused = true;
  }
}

