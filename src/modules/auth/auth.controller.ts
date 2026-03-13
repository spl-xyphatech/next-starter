import { Body, Controller, Get, Post, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from 'src/roles/roles.service';
import { Public } from './guards/authn.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rolesService: RolesService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  validate(@Body() data: SignInDto) {
    return this.authService.login(data);
  }

  @Get(':roleId/permissions')
  getPermissionsByRole(@CurrentUser('roleId') roleId: string) {
    return this.rolesService.findPermissionsByRole(roleId);
  }
}
