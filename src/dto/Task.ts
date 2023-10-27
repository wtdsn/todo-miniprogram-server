import { Rule, RuleType, OmitDto } from '@midwayjs/validate';

export class TaskDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required().max(64).min(1))
  task: string;

  @Rule(
    RuleType.number()
      .required()
      .valid(...[0, 1, 2, 3])
  )
  priority: number;

  @Rule(
    RuleType.number()
      .required()
      .valid(...[0, 1])
  )
  isDone: number;

  @Rule(RuleType.date().required())
  deadline: string;

  @Rule(RuleType.string())
  creatorId: string;

  @Rule(RuleType.date().timestamp())
  updateTime: Date;
}

export class CreateTaskDTO extends OmitDto(TaskDTO, ['id']) {}
