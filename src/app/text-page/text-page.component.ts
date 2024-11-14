import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { EnglishText } from '../models/english-text.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.css']
})
export class TextPageComponent implements OnInit {
  public currentText!: EnglishText;
  public contentOfText!: string[];
  public currentTranslationContent!: string[];
  public currentTranslationIndex: number | null = null;
  public selectedLanguageIndex: number = 0; 

  constructor(private router: Router, private appStateService: AppStateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const textId = this.route.snapshot.paramMap.get('id');
    this.appStateService.getEnglishTextById(Number(textId)).subscribe(
      (text: EnglishText) => {
        this.currentText = text;
        this.contentOfText = this.splitContentToPhrases(text.content);
        this.updateTranslationContent();
      },
      () => {
        this.router.navigate(["/login"]);
      }
    );
  }

  splitContentToPhrases(content: string): string[] {
    return content.split(";");
  }

  showTranslation(index: number) {
    this.currentTranslationIndex = index;
  }

  hideTranslation() {
    this.currentTranslationIndex = null;
  }

  getAllLanguageCodesFromTranslations(): string[] {
    return Array.from(new Set(this.currentText.translations.map(t => t.languageCode)));
  }

  updateTranslationContent() {
    const selectedTranslation = this.currentText.translations[this.selectedLanguageIndex];
    this.currentTranslationContent = this.splitContentToPhrases(selectedTranslation.translation);
  }

  onLanguageCodeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguageIndex = selectElement.selectedIndex;
    this.updateTranslationContent();
  }
}
