import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';

import { ResponseMiddleware } from './middleware/response.mid';
import { JwtMiddleware } from './middleware/jwt';
import * as jwt from '@midwayjs/jwt';
import * as orm from '@midwayjs/typeorm';

@Configuration({
  imports: [
    koa,
    jwt,
    validate,
    orm,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([JwtMiddleware, ResponseMiddleware]);
  }
}
