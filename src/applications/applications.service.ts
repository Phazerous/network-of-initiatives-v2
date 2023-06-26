import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}

  async applyToInitiative(
    initiativeId: string,
    userId: string,
    createApplicationDto: CreateApplicationDto,
  ) {
    const application = await this.prisma.application.create({
      data: {
        ...createApplicationDto,
        applier: { connect: { id: userId } },
        initiative: { connect: { id: initiativeId } },
      },
    });

    return application;
  }
}
