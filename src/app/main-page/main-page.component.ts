import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { EnglishText } from '../models/english-text.model';
import { HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit{

  englishTexts: EnglishText[] = [];

  constructor(private appState: AppStateService){}
 
  ngOnInit(): void {
    this.appState.getAllEnglishTexts().subscribe(
      (data: EnglishText[]) => { 
        this.englishTexts = data; 
      },
      (error: HttpErrorResponse) => { 
        console.error('Error fetching English texts:', error.message); 
      }
    );
  }
}
