export interface EnglishText {
  text_id: number;
  title: string
  content: string;
  content_level: string;
  mainImagePath: string;
  translations: Translation[];  
}

export interface Translation {
  translation_id: number;
  translation: string;
  languageCode:string;
  text_id: number;
}