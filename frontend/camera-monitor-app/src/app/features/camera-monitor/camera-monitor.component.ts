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
  imports: [],
  templateUrl: './camera-monitor.component.html',
  styleUrl: './camera-monitor.component.scss',
})
export class CameraMonitorComponent implements OnInit {
  currentTime = signal(this.formatTime(new Date()));
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    effect(() => {
      const intervalId = setInterval(() => {
        this.currentTime.set(this.formatTime(new Date()));
      }, 60_000);

      this.destroyRef.onDestroy(() => clearInterval(intervalId));
    });
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
