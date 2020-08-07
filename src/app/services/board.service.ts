import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//IMPORT MAP OPERATOR 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  newReleases: any[] = [];
  artist: any[] = [];
  artists: any[] = [];

  spotifyToken: string;
  private clientId = '3199dea3555e4b82a137022fe8966597';
  private refreshToken = '5f47a928923d47019b4a0a92a6a81a60';

  constructor(private httpClient: HttpClient) {

    console.log('servicio spotify funcionando ');
  }

  getToken() {

    const url = `https://node-request.herokuapp.com/spotify/${this.clientId}/${this.refreshToken}`;
    return this.httpClient.get(url, { }).pipe(
      map(response => {

        this.setToken(response['access_token']);
        return response;

      })
    );

  }

  setToken(accessToken: string) {
    this.spotifyToken = accessToken;
    localStorage.setItem('spotifyToken', accessToken);

    const today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('spotifyExpiresAt', today.getTime().toString());
  }

  getQueryUrl(query: string) {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.spotifyToken}`
    });
    const url = `https://api.spotify.com/v1/${query}`;
    return this.httpClient.get(url, { headers });

  }


  getNewReleases() {

    return this.getQueryUrl('browse/new-releases?country=CL&limit=20')
      .pipe(map(data => data['albums'].items));

  }

  getArtists(termino: string) {

    return this.getQueryUrl(`search?q=${termino}&type=artist&market=US`)
      .pipe(map(data => data['artists'].items));

  }

  getArtist(artistId: string) {

    return this.getQueryUrl(`artists/${artistId}`);

  }


  getTopTracks(artistId: string) {

    return this.getQueryUrl(`artists/${artistId}/top-tracks?country=US`)
      .pipe( map(data => data['tracks']) );

  }

}
