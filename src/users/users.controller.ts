import { Controller, Request, Param, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { InitiativesService } from 'src/initiatives/initiatives.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApplicationsService } from 'src/applications/applications.service';

@Controller('')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private initiativesService: InitiativesService,
    private applicationsService: ApplicationsService,
  ) {}

  @Get(':userId')
  async getUser(@Param('userId') requestedUserId: string, @Request() req: any) {
    const currentUserId = req.user.userId;

    return await this.usersService.getPartialUser(
      requestedUserId,
      currentUserId,
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

    return await this.applicationsService.getUserApplications(
      requestedUserId,
      currentUserId,
    );
  }
}
