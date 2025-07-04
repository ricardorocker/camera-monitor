import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
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

  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;

  cameraData = this.service.data;
  videoUrl = computed(() => this.cameraData()?.videoUrl ?? '');
  timeline = computed(() => this.cameraData()?.frames ?? []);
  loading = this.service.loading;
  error = this.service.error;
  alertaAtivo = signal(false);
  acionamentoFinalizado = signal(false);
  countdown = signal(5);

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

  entrarEmTelaCheia() {
    const el = this.videoRef.nativeElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if ((el as any).webkitRequestFullscreen)
      (el as any).webkitRequestFullscreen();
    else if ((el as any).mozRequestFullScreen)
      (el as any).mozRequestFullScreen();
    else if ((el as any).msRequestFullscreen) (el as any).msRequestFullscreen();
  }

  capturarFrame() {
    const video = this.videoRef.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `captura-${Date.now()}.png`;
    a.click();
  }

  acionarAlerta() {
    this.alertaAtivo.set(true);
    this.countdown.set(5);
    const interval = setInterval(() => {
      const atual = this.countdown();
      if (atual <= 1) {
        clearInterval(interval);
        this.countdown.set(0);
        this.acionamentoFinalizado.set(true);
        this.alertaAtivo.set(false);

        setTimeout(() => {
          this.acionamentoFinalizado.set(false);
        }, 4000);

        this.alertaAtivo.set(false);
      } else {
        this.countdown.set(atual - 1);
      }
    }, 1000);
  }

  cancelarAlerta() {
    this.alertaAtivo.set(false);
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
