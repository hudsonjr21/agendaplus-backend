import { Controller, Request, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request as Req } from 'express';
import { LoginUserDto } from '../dto/input-auth.dto';
import { TokenDto } from '../dto/output-auth.dto';
import { LoginUserService } from 'src/domain/modules/usecases/process/acess-control/auth/login-user-usecase';

@ApiTags('Auth')
@Controller('auth/')
export class ApiController {
  constructor(private loginUserService: LoginUserService) {}

  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 201, type: TokenDto })
  @ApiResponse({ status: 401 })
  @Post('login')
  async login(@Request() req: Req): Promise<TokenDto | unknown> {
    return this.loginUserService.execute(req.body);
  }
}
