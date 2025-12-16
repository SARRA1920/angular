import { Suggestion } from '../suggestion';

export const SUGGESTIONS: Suggestion[] = [
  {
    id: 1,
    title: 'Organiser une journée team building',
    description:
      "Suggestion pour organiser une journée de team building pour renforcer la cohésion et la communication de l'équipe.",
    category: 'Evénements',
    date: new Date('2025-05-20'),
    status: 'Accepté',
    nbLikes: 12,
  },
  {
    id: 2,
    title: 'Améliorer le système de réservation',
    description:
      "Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.",
    category: 'Technologie',
    date: new Date('2025-05-15'),
    status: 'Refusé',
    nbLikes: 5,
  },
];

