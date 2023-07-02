import {
  Controller,
  UseGuards,
  Param,
  Request,
  Post,
  Get,
  Query,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private applicationService: ApplicationsService) {}

  @Post(':initiativeId/new')
  async applyToInitiative(
    @Param('initiativeId') initiativeId: string,
    @Request() req: any,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    const userId = req.user.userId;

    return await this.applicationService.applyToInitiative(
      initiativeId,
      userId,
      createApplicationDto,
    );
  }

  @Get(':applicationId')
  async getApplicationById(
    @Param('applicationId') applicationId: string,
    @Query('type') type: string,
    @Request() req: any,
  ) {
    const userId = req.user.userId;

    if (type === 'initiator') {
      return this.applicationService.getApplicationForInitiator(applicationId);
    }

    return '47 ON BACK';
  }
}
