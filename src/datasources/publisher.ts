import type { PublisherModel } from '../models/publisher.js';

export class PublishersDataSource {
  private nextId: number;

  constructor(private readonly publishers: PublisherModel[]) {
    this.nextId = publishers.length + 1;
  }

  findAll(): PublisherModel[] {
    return this.publishers;
  }

  findById(id: string): PublisherModel | undefined {
    return this.publishers.find((publisher) => publisher.id === id);
  }

  create(data: Omit<PublisherModel, 'id'>): PublisherModel {
    const publisher: PublisherModel = { id: String(this.nextId++), ...data };
    this.publishers.push(publisher);
    return publisher;
  }

  update(id: string, changes: Partial<Omit<PublisherModel, 'id'>>): PublisherModel | undefined {
    const publisher = this.findById(id);
    if (!publisher) return undefined;
    Object.assign(publisher, changes);
    return publisher;
  }

  delete(id: string): boolean {
    const index = this.publishers.findIndex((publisher) => publisher.id === id);
    if (index === -1) return false;
    this.publishers.splice(index, 1);
    return true;
  }
}