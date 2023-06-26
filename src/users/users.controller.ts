import { Controller, Request, Param, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { InitiativesService } from 'src/initiatives/initiatives.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private initiativesService: InitiativesService,
  ) {}

  @Get(':userId/initiatives')
  async getUserInitiatives(
    @Param('userId') requestedUserId: string,
    @Request() req: any,
  ) {
    const currentUserId = req.user.userId;

    await this.usersService.verifyUserAccess(requestedUserId, currentUserId);

    return await this.initiativesService.getInitiatives(requestedUserId);
  }
}
