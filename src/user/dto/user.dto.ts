// 新建用户
export class CreateUserDTO {
  readonly id: number;
  readonly username: string;
  readonly password: string;
}

// 编辑用户
export class EditUserDTO {
  readonly username: string;
  readonly password: string;
}
