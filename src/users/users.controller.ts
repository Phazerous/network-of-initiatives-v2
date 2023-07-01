import {
  Controller,
  Request,
  Param,
  Get,
  UseGuards,
  Post,
  Body,
  Patch,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { InitiativesService } from 'src/initiatives/initiatives.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApplicationsService } from 'src/applications/applications.service';
import UpdateUserDto from './dto/update-user.dto';

@Controller('')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private initiativesService: InitiativesService,
    private applicationsService: ApplicationsService,
  ) {}

  @Get('account')
  async getUserId(@Request() req: any) {
    const userId = req.user.userId;

    return userId;
  }

  @Get(':userId')
  async getUser(@Param('userId') requestedUserId: string, @Request() req: any) {
    const currentUserId = req.user.userId;

    return await this.usersService.getPartialUser(
      requestedUserId,
      currentUserId,
    );
  }

  @Patch(':userId')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateUser(
    @Param('userId') requestedUserId: string,
    @Request() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const currentUserId = req.user.userId;

    return await this.usersService.updateUser(
      requestedUserId,
      currentUserId,
      updateUserDto,
    );
  }

  @Get(':userId/initiatives')
  async getUserInitiatives(
    @Param('userId') requestedUserId: string,
    @Request() req: any,
  ) {
    const currentUserId = req.user.userId;

    await this.usersService.verifyUserAccess(requestedUserId, currentUserId);

    return await this.initiativesService.getInitiatives(requestedUserId);
  }

  @Get(':userId/applications')
  async getUserApplications(
    @Param('userId') requestedUserId: string,
    @Request() req: any,
  ) {
    const currentUserId = req.user.userId;

    return await this.applicationsService.getUserApplicationsShort(
      requestedUserId,
      currentUserId,
    );
  }
}
