import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Suggestion } from '../../suggestion';
import { SUGGESTIONS } from '../suggestions.data';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css'],
})
export class SuggestionFormComponent {
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre',
  ];

  today = new Date();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^[A-Z][a-zA-Z]*$/),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', [Validators.required]],
      date: [{ value: this.today.toISOString().substring(0, 10), disabled: true }],
      status: [{ value: 'en attente', disabled: true }],
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const nextId =
      SUGGESTIONS.reduce((max, s) => Math.max(max, s.id), 0) + 1;

    const newSuggestion: Suggestion = {
      id: nextId,
      title: raw.title || '',
      description: raw.description || '',
      category: raw.category || '',
      date: new Date(), // system date
      status: 'en attente',
      nbLikes: 0,
    };

    SUGGESTIONS.push(newSuggestion);
    this.router.navigate(['/suggestions']);
  }
}

