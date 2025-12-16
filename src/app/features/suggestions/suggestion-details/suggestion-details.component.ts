import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Suggestion } from '../../suggestion';
import { SUGGESTIONS } from '../suggestions.data';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css'],
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion?: Suggestion;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.suggestion = SUGGESTIONS.find((s) => s.id === id);
  }
}

