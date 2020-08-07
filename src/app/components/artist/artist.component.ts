import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../services/board.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent {

  artist: any = {};
  topTracks: any = {};
  loader: boolean;
  error: boolean;
  messageError: string;

  constructor(private activatedRoute: ActivatedRoute,
              private BoardService: BoardService) {

    this.loader = false;

    this.activatedRoute.params.subscribe(params => {

      this.getArtist(params.id);
      this.getTopTracks(params.id);

    });
  }

  getArtist(id: string) {

    this.loader = true;
    this.messageError = '';

    this.BoardService.getArtist(id).subscribe(data => {

      this.artist = data;
      this.loader = false;

    }, error => {

      this.loader = false;
      this.error = true;

    });
  }

  getTopTracks(id: string) {

    this.loader = true;
    this.messageError = '';

    this.BoardService.getTopTracks(id).subscribe(data => {

      this.topTracks = data;
      this.loader = false;

    }, responseError => {

      this.loader = false;
      this.error = true;
      this.messageError = responseError.error.error.message;

    });

  }

}
