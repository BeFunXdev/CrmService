import {Controller, Get} from '@nestjs/common';
import { UserService } from './user.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id)
  }
}
