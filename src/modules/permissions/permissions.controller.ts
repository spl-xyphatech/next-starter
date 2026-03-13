import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Permission } from 'src/auth/enums/permission.enum';
// import { Can } from 'src/auth/guards/authz.guard';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { QueryPermissionDto } from './dto/query-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller({ version: '1', path: 'permissions' })
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  // @Can(Permission.CREATE_PERMISSION)
  create(
    @Body() createPermissionDto: CreatePermissionDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.permissionsService.create(createPermissionDto, userId);
  }

  @Get()
  // @Can(Permission.READ_PERMISSION)
  findAll(@Query() query: QueryPermissionDto) {
    return this.permissionsService.findAll(query);
  }

  @Get(':id')
  // @Can(Permission.READ_PERMISSION)
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  // @Can(Permission.UPDATE_PERMISSION)
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  // @Can(Permission.DELETE_PERMISSION)
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
