import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AppStateService } from '../services/app-state.service'; 
import { EnglishText, Translation } from '../models/english-text.model'; 

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public englishTextForm: FormGroup;
  public englishTexts: EnglishText[] = []; 

  constructor(private fb: FormBuilder, private appStateService: AppStateService) {
    this.englishTextForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      content_level: ['', Validators.required],
      mainImagePath: ['', Validators.required],
      translations: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    this.loadExistingTexts();
  }

  loadExistingTexts() {
    this.appStateService.getAllEnglishTexts().subscribe(
      (texts: EnglishText[]) => this.englishTexts = texts,
      error => console.error('Ошибка загрузки текстов', error)
    );
  }


  get translations(): FormArray {
    return this.englishTextForm.get('translations') as FormArray;
  }

  addTranslationField() {
    this.translations.push(
      this.fb.group({
        translation_id: [0],
        translation: ['', Validators.required],
        languageCode:['',Validators.required],
        text_id: [0],
      })
    );
  }

  removeTranslationField(index: number) {
    this.translations.removeAt(index);
  }

 submitForm() {
    if (this.englishTextForm.valid) {
      const newText: EnglishText = this.englishTextForm.value;
      this.appStateService.addEnglishText(newText).subscribe(
        () => {
          this.loadExistingTexts(); 
          this.englishTextForm.reset(); 
          this.translations.clear();
        },
        error => console.error('Ошибка добавления текста', error)
      );
    }
  }

  deleteTextById(id:number){
    this.appStateService.deleteEnglishText(id);
    window.location.reload();
  }
 
  

}

