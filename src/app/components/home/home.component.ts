import { Component } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  newReleases: any[] = [];
  loader: boolean;
  error: boolean;
  messageError: string;

  constructor(private BoardService: BoardService,
              private authService: AuthService,
              private router: Router) {

    this.loader = true;
    this.loader = false;
    this.messageError = '';

    // if (localStorage.getItem('spotifyToken')) {

    //   this.getNewReleasesHome();
    // } else {

    //   this.getNewTokenSpotify();
    // }

  }


  // async getNewTokenSpotify() {

  //   //Request token spotify
  //   this.BoardService.getToken().subscribe(responseSpotify => {
  //     this.getNewReleasesHome();
  //   });


  // }


  // getNewReleasesHome() {
  //   return this.BoardService.getNewReleases().subscribe(data => {

  //     this.newReleases = data;
  //     this.loader = false;

  //   }, responseError => {

  //     this.loader = false;
  //     this.error = true;
  //     this.messageError = responseError.error.error.message;

  //   });
  // }

}
