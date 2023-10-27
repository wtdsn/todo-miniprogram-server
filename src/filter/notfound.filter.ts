import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { NotFoundError } from '@midwayjs/core/dist/error/http';
import { Context } from '@midwayjs/koa';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    throw new NotFoundError('404 not foumd' + ctx.path);
  }
}
