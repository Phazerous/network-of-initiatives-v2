import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Request,
  Param,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { InitiativesService } from './initiatives.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('initiatives')
@UseGuards(JwtAuthGuard)
export class InitiativesController {
  constructor(private initiativeService: InitiativesService) {}

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
  async getInitiativeById(@Param('initiativeId') initiativeId: string) {
    return await this.initiativeService.getInitiativeById(initiativeId);
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
}
