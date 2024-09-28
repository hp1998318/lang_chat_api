import { Inject, Controller, Post, Provide, Body } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IGetUserResponse } from '../interface';
import { UserService } from '../service/user';

@Provide()
@Controller('/v1')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/chat')
  async getUser(@Body('input') input: string): Promise<IGetUserResponse> {
    console.log('input', input, this.ctx.request);
    const user = await this.userService.getUserToChat({ input });
    return { success: true, message: 'OK', data: user.aiMessage as any };
  }
}
