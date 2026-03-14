import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from './character.service';
import { Character } from './character.service';
 
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CharacterListComponent implements OnInit {

  characters: any[] = [];
    isLoading = true;
  errorMessage = '';
  currentPage = 1;
  totalPages = 1; // Actualizar según la API
  searchTerm = '';
  selectedStatus = '';

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading = true;
    let apiCall;

    if (this.searchTerm) {
        apiCall = this.characterService.searchCharacters(this.searchTerm, this.currentPage);
    } else if (this.selectedStatus) {
      apiCall = this.characterService.filterCharactersByStatus(this.selectedStatus, this.currentPage);
    } else {
      apiCall = this.characterService.getCharacters(this.currentPage);
    }

    apiCall.subscribe({
      next: (data: any) => {
          this.characters = data.results;
        this.isLoading = false;
        this.totalPages = data.info.pages; // Asumiendo que la API devuelve el número total de páginas
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los personajes.';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadCharacters();
  }

  onStatusChange(): void {
    this.currentPage = 1;
    this.loadCharacters();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCharacters();
  }

  getPages(): number[] {
    const totalPagesArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      totalPagesArray.push(i);
    }
    return totalPagesArray;
  }
}
