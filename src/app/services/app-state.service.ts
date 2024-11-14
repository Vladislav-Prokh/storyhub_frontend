import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { EnglishText } from '../models/english-text.model';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {


  private texts$: Observable<EnglishText[]> | null = null;

  constructor(private apiService: ApiService) {}

  getAllEnglishTexts(): Observable<EnglishText[]> {
    if (!this.texts$) {
      this.texts$ = this.apiService.getAllEnglishTexts().pipe(
        shareReplay(1)
      );
    }
    return this.texts$;
  }

  getEnglishTextById(id:number){
    return this.apiService.getEnglishTextById(id);
  }

  addEnglishText(text: EnglishText): Observable<EnglishText> {
    return this.apiService.addEnglishText(text);
  }


  deleteEnglishText(id:number) {
    this.apiService.deleteEnglishTextById(id);
  }

}