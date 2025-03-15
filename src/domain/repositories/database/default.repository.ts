export abstract class DefaultRepository<T> {
  abstract get: (filters: Partial<T>) => Promise<T | null>;
  abstract getAll: () => Promise<T[]>;
  abstract save: (data: Partial<T>) => Promise<T>;
  abstract update: (data: Partial<T>, filters: Partial<T>) => Promise<any>;
  abstract delete: (id: number | number) => Promise<any>;
}
