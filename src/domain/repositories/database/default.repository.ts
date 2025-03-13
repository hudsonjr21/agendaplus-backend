export abstract class DefaultRepository<T> {
  abstract getStream: (filters: Partial<T>) => Promise<any>;
  abstract getAll: () => Promise<T[]>;
  abstract get: (filters: Partial<T>) => Promise<T>;
  // abstract save: (entity: Partial<T>) => Promise<T>;
  // abstract update: (entity: Partial<T>, filters: Partial<T>) => Promise<any>;
  abstract delete: (id: string) => Promise<any>;
}
