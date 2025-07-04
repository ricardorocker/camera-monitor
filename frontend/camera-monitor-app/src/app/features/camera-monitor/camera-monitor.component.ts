import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-camera-monitor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera-monitor.component.html',
  styleUrl: './camera-monitor.component.scss',
})
export class CameraMonitorComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  currentTime = signal(this.formatTime(new Date()));
    timeline = signal([
    { hora: '19:00', frame: 'frame1.png' },
    { hora: '19:05', frame: 'frame2.png' },
    { hora: '19:10', frame: 'frame3.png' },
    { hora: '19:15', frame: 'frame4.png' },
    { hora: '19:20', frame: 'frame5.png' },
  ]);

  constructor() {
    effect(() => {
      const intervalId = setInterval(() => {
        this.currentTime.set(this.formatTime(new Date()));
      }, 60_000);

      this.destroyRef.onDestroy(() => clearInterval(intervalId));
    });
  }

  ngOnInit(): void {}

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
