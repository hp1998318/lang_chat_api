import { Controller, Provide, Inject, Get } from '@midwayjs/decorator';
import { UserService } from '../service/user';

@Provide()
@Controller('/')
export class HomeController {
  @Inject()
  userService: UserService;
  @Get('/')
  async home() {
    return { success: true, message: 'OK', data: 'hello' };
  }
}
