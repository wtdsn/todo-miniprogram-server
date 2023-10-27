import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { LoginServer } from '../service/login';
import { Context } from '@midwayjs/koa';

interface LoginObj {
  code: string;
}

@Controller('/')
export class APIController {
  @Inject()
  loginServer: LoginServer;

  @Inject()
  ctx: Context;

  @Post('/login')
  async login(@Body() loginObj: LoginObj) {
    return await this.loginServer.login(loginObj.code);
  }

  @Post('/checkLogin')
  async checkLogin() {
    return await this.loginServer.checkLogin();
  }
}
