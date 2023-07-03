import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Request,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { InitiativesService } from './initiatives.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateApplicationDto } from 'src/applications/dto/create-application.dto';
import { ApplicationsService } from 'src/applications/applications.service';

@Controller('initiatives')
@UseGuards(JwtAuthGuard)
export class InitiativesController {
  constructor(
    private initiativeService: InitiativesService,
    private applicationService: ApplicationsService,
  ) {}

  @Post('/new')
  @UsePipes(new ValidationPipe())
  async createInitaitive(
    @Request() req: any,
    @Body() createInitiativeDto: CreateInitiativeDto,
  ) {
    const userId = req.user.userId;

    return await this.initiativeService.createInitiative(
      userId,
      createInitiativeDto,
    );
  }

  @Get(':initiativeId')
  @UseGuards()
  async getInitiativeById(
    @Param('initiativeId') initiativeId: string,
    @Request() req: any,
  ) {
    const userId = req.user.userId;

    return await this.initiativeService.getInitiativeById(initiativeId, userId);
  }

  @Get(':initiativeId/applications')
  async getInitiativeApplications(
    @Param('initiativeId') initiativeId: string,
    @Request() req: any,
  ) {
    const userId = req.user.userId;

    return await this.initiativeService.getInitiativeApplication(
      initiativeId,
      userId,
    );
  }

  @Post(':initiativeId/applications')
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
}
