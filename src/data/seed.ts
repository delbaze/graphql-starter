import type { AuthorModel } from '../models/author.js';
import type { BookModel } from '../models/book.js';
import type { PublicationModel } from '../models/publication.js';
import type { PublisherModel } from '../models/publisher.js';

export const seedAuthors: AuthorModel[] = [
  { id: '1', name: 'Victor Hugo' },
  { id: '2', name: 'Jules Verne' },
  { id: '3', name: 'Fred Vargas' },
  { id: '4', name: 'Albert Camus' },
];

export const seedBooks: BookModel[] = [
  { id: '1', title: 'Les Miserables', year: 1862, genre: 'ROMAN', authorId: '1', "publisherId": '1'},
  { id: '2', title: 'Vingt mille lieues sous les mers', year: 1870, genre: 'SF', authorId: '2', "publisherId": '1' },
  { id: '3', title: 'De la Terre a la Lune', year: 1865, genre: 'SF', authorId: '2', "publisherId": '2' },
  { id: '4', title: 'Pars vite et reviens tard', year: 2001, genre: 'POLICIER', authorId: '3', "publisherId": '3' },
  { id: '5', title: "L'Homme revolte", year: 1951, genre: 'ESSAI', authorId: '4', "publisherId": '4' },
];


export const seedPublishers: PublisherModel[] = [
  { id: '1', name: 'A. Lacroix, Verboeckhoven et Cie', country: 'Belgique', foundedYear: null },
  { id: '2', name: 'Hetzel', country: 'France', foundedYear: 1837 },
  { id: '3', name: 'Viviane Hamy', country: 'France', foundedYear: 1990 },
  { id: '4', name: 'Gallimard', country: 'France', foundedYear: 1911 },
];

export const seedPublications: PublicationModel[] = [
  { id: '1', kind: 'ROMAN', title: 'Les Miserables', authorId: '1', preface: true },
  { id: '2', kind: 'BD', title: 'Vingt mille lieues sous les mers (adaptation BD)', authorId: '2', color: true },
  { id: '3', kind: 'ROMAN', title: "L'Etranger", authorId: '4', preface: false },
  { id: '4', kind: 'BD', title: 'Pars vite et reviens tard (adaptation BD)', authorId: '3', color: false },
];