import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async applyToInitiative(
    initiativeId: string,
    userId: string,
    createApplicationDto: CreateApplicationDto,
  ) {}
}
