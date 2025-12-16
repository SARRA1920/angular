import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Suggestion } from '../../suggestion';
import { SUGGESTIONS } from '../suggestions.data';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.css'],
})
export class SuggestionsListComponent {
  suggestions: Suggestion[] = SUGGESTIONS;
  favorites: Suggestion[] = [];
  searchTerm = '';
  searchCategory = '';

  get categories(): string[] {
    const cats = new Set(
      this.suggestions
        .map((s) => s.category?.trim())
        .filter((c): c is string => !!c)
    );
    return Array.from(cats);
  }

  get filteredSuggestions(): Suggestion[] {
    const term = this.searchTerm.trim().toLowerCase();
    const category = this.searchCategory.trim().toLowerCase();
    return this.suggestions.filter((s) => {
      const titleMatch = !term || s.title.toLowerCase().includes(term);
      const catMatch = !category || s.category.toLowerCase() === category;
      return titleMatch && catMatch;
    });
  }

  constructor(private router: Router) {}

  goToDetails(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }

  isRefused(s: Suggestion): boolean {
    const status = (s.status || '').toLowerCase();
    return status === 'refusé' || status === 'refuse';
  }

  like(s: Suggestion): void {
    s.nbLikes = (s.nbLikes || 0) + 1;
  }

  addToFavorites(s: Suggestion): void {
    const exists = this.favorites.some((f) => f.id === s.id);
    if (!exists) {
      this.favorites.push(s);
    }
  }

  goToForm(): void {
    this.router.navigate(['/suggestions/new']);
  }

  statusClass(s: Suggestion): string {
    return (s.status || '').toLowerCase().replace(/\s+/g, '-');
  }
}

