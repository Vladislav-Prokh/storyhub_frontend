import { Component,Input  } from '@angular/core';
import { EnglishText } from '../models/english-text.model';
@Component({
  selector: 'app-english-text-card',
  templateUrl: './english-text-card.component.html',
  styleUrls: ['./english-text-card.component.css']
})
export class EnglishTextCardComponent {
  @Input() text!: EnglishText; 
  private text_id!: number ;
}
