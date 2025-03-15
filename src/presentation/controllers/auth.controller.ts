import { Controller, Request, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request as Req } from 'express';
import { LoginUserDto } from '../dto/input-auth.dto';
import { LoginUserService } from '../services/login-user.service';
import { ErrorHandleDto } from 'src/@nest-modules/global/dto/output-global.dto';
import { TokenDto } from '../dto/output-auth.dto';

@ApiTags('Auth')
@Controller('auth/')
export class ApiController {
  constructor(private loginUserService: LoginUserService) {}

  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 201, type: TokenDto })
  @ApiResponse({ status: 401, type: ErrorHandleDto })
  @Post('login')
  async login(@Request() req: Req): Promise<TokenDto | unknown> {
    return this.loginUserService.execute(req.body);
  }
}
