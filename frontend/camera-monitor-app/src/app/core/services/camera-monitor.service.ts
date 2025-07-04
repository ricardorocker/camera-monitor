import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CameraData {
  videoUrl: string;
  frames: { hora: string; frame: string }[];
}

@Injectable({ providedIn: 'root' })
export class CameraMonitorService {
  private readonly apiUrl = 'http://localhost:3000/cameraData';

  readonly data = signal<CameraData | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {
    this.loading.set(true);
    this.http.get<CameraData>(this.apiUrl).subscribe({
      next: (res) => {
        this.data.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar os dados da câmera');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
