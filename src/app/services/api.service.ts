import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnglishText } from '../models/english-text.model';

@Injectable({
    providedIn:'root',
})

export class ApiService{

    private baseUrl = 'http://localhost:8080';

    constructor(private http:HttpClient){}

    getAllEnglishTexts(): Observable<EnglishText[]>{
        return this.http.get<EnglishText[]>(`${this.baseUrl}/texts/all`);
    }
    getEnglishTextById(id:number):Observable<EnglishText>{
        return this.http.get<EnglishText>(`${this.baseUrl}/texts/${id}`);
    }
    addEnglishText(text: EnglishText): Observable<EnglishText> {
        return this.http.post<EnglishText>(`${this.baseUrl}/admin/add/text`, text);
    }

    deleteEnglishTextById(id: number) {
        this.http.post(`${this.baseUrl}/admin/delete/text/${id}`, null).subscribe({
          error: (error) => {
            console.error('Error deleting text', error);
          }
        });
    }
}