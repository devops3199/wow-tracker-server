import { Context } from '../../shared/types';
import { EntityManager, getManager } from 'typeorm';
import { Container } from 'typedi';

export const typediMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  Container.set(EntityManager, getManager());
  await next();
};
