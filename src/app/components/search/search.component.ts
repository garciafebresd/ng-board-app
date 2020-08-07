import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  artists: any[] = [];
  loader: boolean;
  error: boolean;
  messageError: string;

  constructor(private BoardService: BoardService) { }

  buscar(termino: string) {

    this.error = false;

    if (termino.length > 0) {
      this.loader = true;
      this.messageError = '';

      this.BoardService.getArtists(termino).subscribe(data => {

        this.artists = data;
        this.loader = false;

      }, responseError => {

        this.loader = false;
        this.error = true;
        this.messageError = responseError.error.error.message;

      });
    }


  }

}
