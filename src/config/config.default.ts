import { MidwayConfig } from '@midwayjs/core';
import miniApp from '../../config/mini-app';
import dataBase from '../../config/database';
import jwt from '../../config/jwt';

export default {
  keys: 'todo-miniprogram-4787',
  koa: {
    port: 4787,
    globalPrefix: '/action',
  },
  jwt,
  miniApp,
  typeorm: {
    dataSource: {
      default: {
        ...dataBase,
        type: 'mysql',
        synchronize: false,
        logging: false,

        // 或者扫描形式
        entities: ['**/entity/*{.ts,.js}'],
      },
    },
  },
  validate: {
    validationOptions: {
      stripUnknown: true, // 全局生效
    },
  },
} as MidwayConfig;
