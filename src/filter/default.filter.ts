import { Catch } from '@midwayjs/core';
import { InternalServerErrorError } from '@midwayjs/core/dist/error/http';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error) {
    // 所有的未分类错误会到这里
    throw new InternalServerErrorError(err.message || '服务器错误');
  }
}
