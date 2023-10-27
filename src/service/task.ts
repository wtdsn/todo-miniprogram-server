import { Provide, Inject, Init } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { Task } from '@/entity/Task';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDTO, TaskDTO } from '@/dto/Task';

@Provide()
export class TaskService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Task)
  taskModel: Repository<Task>;

  openId: string;
  @Init()
  initOpenId() {
    this.openId = this.ctx.getAttr('openId');
  }

  // 查询
  async list() {
    const res = await this.taskModel.find({
      where: {
        creatorId: this.openId,
      },
    });

    return {
      list: res,
    };
  }

  // 创建
  async create(taskObj: CreateTaskDTO) {
    taskObj.creatorId = this.openId;

    return await this.taskModel.save(taskObj);
  }

  // 编辑
  async modify(taskObj: TaskDTO) {
    const task = await this.taskModel.findOne({
      where: {
        id: taskObj.id,
        creatorId: this.openId,
      },
    });
    if (!task) {
      throw new Error('任务不存在');
    }

    taskObj.creatorId = this.openId;

    await this.taskModel.save(taskObj);

    return 'OK';
  }

  // 删除
  async delete(id: number) {
    const { affected } = await this.taskModel.delete({
      id,
      creatorId: this.openId,
    });

    if (affected) {
      return 'OK';
    }

    throw new Error('任务不存在');
  }
}
