import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
}

interface ApiResponse {
  results: any[];
  info: {
    next: string | null;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1): Observable<ApiResponse> {
    const url = `${this.baseUrl}?page=${page}`;
    return this.http.get<ApiResponse>(url);
  }

  searchCharacters(name: string, page: number = 1): Observable<ApiResponse> {
    const url = `${this.baseUrl}?name=${name}&page=${page}`;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => ({
        ...response,
        results: response.results.map(character => this.mapCharacter(character))
      }))
    );
  }

  filterCharactersByStatus(status: string, page: number = 1): Observable<ApiResponse> {
    const url = `${this.baseUrl}?status=${status}&page=${page}`;
    return this.http.get<ApiResponse>(url).pipe(
      map(response => ({
        ...response,
        results: response.results.map(character => this.mapCharacter(character))
      }))
    );
  }

  private mapCharacter(character: any): Character {
    return {
      ...character,
      status: character.status || character.estado // Use English or Spanish status
    };
  }
}
