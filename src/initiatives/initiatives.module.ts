import { Module, UseGuards } from '@nestjs/common';
import { InitiativesController } from './initiatives.controller';
import { InitiativesService } from './initiatives.service';
import { SharedModule } from 'src/shared/shared.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApplicationsService } from 'src/applications/applications.service';

@Module({
  imports: [SharedModule],
  controllers: [InitiativesController],
  providers: [InitiativesService, ApplicationsService],
})
export class InitiativesModule {}
