import { Component } from '@angular/core';
import { CameraMonitorComponent } from "./features/camera-monitor/camera-monitor.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CameraMonitorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'camera-monitor-app';
}
