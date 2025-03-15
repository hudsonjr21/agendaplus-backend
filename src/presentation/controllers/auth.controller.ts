import { Controller, Request, Post } from '@nestjs/common';
import { Request as Req } from 'express';
import { TokenDto } from '../dto/output-auth.dto';
import { LoginUserService } from 'src/domain/modules/usecases/process/acess-control/auth/login-user-usecase';

@Controller('auth/')
export class ApiController {
  constructor(private loginUserService: LoginUserService) {}

  @Post('login')
  async login(@Request() req: Req): Promise<TokenDto | unknown> {
    return this.loginUserService.execute(req.body);
  }
}
