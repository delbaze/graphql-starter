import type { PublicationModel } from '../models/publication.js';

export class PublicationsDataSource {
  constructor(private readonly publications: PublicationModel[]) {}

  findAll(): PublicationModel[] {
    return this.publications;
  }
}