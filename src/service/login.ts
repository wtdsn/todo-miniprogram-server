import { Provide, Inject } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { makeHttpRequest } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Config } from '@midwayjs/core';

interface Jscode2SessionRes {
  data:
    | {
        openid: string;
      }
    | {
        errmsg: string;
        errcode: number;
      };
}

@Provide()
export class LoginServer {
  @Inject()
  jwtService: JwtService;

  @Inject()
  ctx: Context;

  @Config('miniApp')
  miniApp;

  async login(code: string) {
    const { data } = (await makeHttpRequest(
      'https://api.weixin.qq.com/sns/jscode2session',
      {
        method: 'GET',
        dataType: 'json',
        data: {
          appid: this.miniApp.appid,
          secret: this.miniApp.secret,
          js_code: code,
          grant_type: 'authorization_code',
        },
      }
    )) as Jscode2SessionRes;
    if ('errmsg' in data) {
      throw Error(data.errmsg);
    }

    const token = await this.jwtService.signSync({
      openId: data.openid,
    });

    return {
      token: 'Bearer ' + token,
    };
  }

  async checkLogin() {
    const token = await this.jwtService.signSync({
      openId: this.ctx.getAttr('openId'),
    });

    return {
      token: 'Bearer ' + token,
    };
  }
}
