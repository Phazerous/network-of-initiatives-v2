import { Controller, UseGuards, Param, Request, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  @Post(':initiativeId/new')
  async applyToInitiative(
    @Param('initiativeId') initiativeId: string,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
  }
}
