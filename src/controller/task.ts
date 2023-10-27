import { Controller, Inject, Post, Body } from '@midwayjs/core';
import { TaskService } from '../service/task';
import { CreateTaskDTO, TaskDTO } from '@/dto/Task';

@Controller('/task')
export class HomeController {
  @Inject()
  taskService: TaskService;

  @Post('/list')
  async list() {
    return await this.taskService.list();
  }

  @Post('/create')
  async create(@Body() taskObj: CreateTaskDTO) {
    return await this.taskService.create(taskObj);
  }

  @Post('/modify')
  async modify(@Body() taskObj: TaskDTO) {
    return await this.taskService.modify(taskObj);
  }

  @Post('/delete')
  async delete(@Body('id') id: number) {
    return await this.taskService.delete(id);
  }
}
