import { Component, input } from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item.component';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.scss'
})
export class GifListComponent {

  //TODO: input string[];
  //gifs = input.required<string[]>()

  //esperamos una instancia de nuestro Gifs
  gifs = input.required<Gif[]>();
}
