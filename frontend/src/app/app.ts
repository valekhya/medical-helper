import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [CommonModule, HttpClientModule]
})
export class App {
  selectedFile: File | null = null;
  loading = false;
  isDragOver = false;
  result: any = null;
  error: string = '';
  altResult: Record<string, string> = {};

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.error = 'Please select a PDF file first.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.loading = true;
    this.error = '';
    this.result = null;

    this.http.post<any>('http://localhost:3000/api/pdf/upload', formData)
      .subscribe({
        next: (res) => {
          this.result = res.result;
          this.loading = false;
        },
        error: (err) => {
          console.error('Upload error:', err);
          this.error = 'Upload failed: ' + (err.message || 'Unknown error');
          this.loading = false;
        }
      });
  }

  markerKeys(): string[] {
    return Object.keys(this.result || {});
  }

  getStatusEmoji(marker: string): string {
    const expl = this.result[marker].explanation.toLowerCase();
    if (expl.includes('low') || expl.includes('high')) return '⚠️';
    return '✅';
  }

  getStatusClass(marker: string): string {
    const expl = this.result[marker].explanation.toLowerCase();
    if (expl.includes('low')) return 'status-low';
    if (expl.includes('high')) return 'status-high';
    return 'status-ok';
  }

  requestAlternative(marker: string, needsAlternative: boolean = false) {
    if (!needsAlternative) return;

    // Replace with actual backend call in production
    this.altResult[marker] = `Alternative advice for ${marker} — e.g., simpler dietary/lifestyle changes.`;
  }

  resetApp() {
    this.result = null;
    this.altResult = {};
    this.selectedFile = null;
    this.error = '';
    this.loading = false;
  }



  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
      } else {
        this.error = 'Only PDF files are supported. Please upload a valid PDF.';
      }
    }
  }

}