import { Context as KoaContext } from 'koa';
import { User } from '../api/services/user/domain/model';

type Context = KoaContext & { state: { userId?: number; user: User } };

export { Context };
