import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CameraMonitorService } from '../../core/services/camera-monitor.service';

@Component({
  selector: 'app-camera-monitor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera-monitor.component.html',
  styleUrl: './camera-monitor.component.scss',
})
export class CameraMonitorComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private service = inject(CameraMonitorService);

  cameraData = this.service.data;
  videoUrl = computed(() => this.cameraData()?.videoUrl ?? '');
  timeline = computed(() => this.cameraData()?.frames ?? []);
  loading = this.service.loading;
  error = this.service.error;

  currentTime = signal(this.formatTime(new Date()));

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
