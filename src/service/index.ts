import { EntityManager } from 'typeorm';
import { Container } from 'typedi';

export class Service {
  entityManager!: EntityManager;

  constructor() {
    this.entityManager = Container.get(EntityManager);
  }
}
