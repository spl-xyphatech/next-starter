import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller({ version: '1', path: 'roles' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(
    @Body() createRoleDto: CreateRoleDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.rolesService.create(createRoleDto, userId);
  }

  @Get()
  findAll(@Query() query: QueryRoleDto) {
    return this.rolesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  @Get(':roleId/permissions')
  async permission(@Param('roleId', ParseUUIDPipe) roleId: string) {
    const data = await this.rolesService.findPermissions(roleId);
    return data;
  }

  @Patch(':roleId/permissions')
  async updatePermission(
    @Param('roleId', ParseUUIDPipe) roleId: string,
    @Body() dto: any,
    // @CurrentUser('sub') userId: string,
  ) {
    const data = await this.rolesService.updatePermission(roleId, dto);
    return { data };
  }
}
