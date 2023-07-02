import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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

  async getApplicationById(applicationId: string, currentUserId: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });

    if (!application) throw new NotFoundException();

    const initiativeOwner = await this.getInitiativeOwnerByApplicationId(
      applicationId,
    );

    if (
      currentUserId !== initiativeOwner.id ||
      currentUserId !== application.applierId
    )
      throw new ForbiddenException();

    return application;
  }

  private async getInitiativeOwnerByApplicationId(applicationId: string) {
    const initiative = await this.prisma.initiative.findFirst({
      where: {
        Application: {
          some: {
            id: applicationId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    if (!initiative) throw new Error('Application without an initiative');

    return initiative.user;
  }

  async getUserApplicationsShort(
    requestedUserId: string,
    currentUserId: string,
  ) {
    if (requestedUserId !== currentUserId) throw new ForbiddenException();

    const applications = await this.prisma.application.findMany({
      where: {
        applierId: requestedUserId,
      },
      select: {
        id: true,
        status: true,
        initiative: {
          select: {
            title: true,
          },
        },
      },
    });

    return applications;
  }

  async getApplicationForUser(applicationId: string) {
    return 'Not yet implemented';
  }

  async getApplicationForInitiator(applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        about: true,
        applier: {
          select: {
            name: true,
            lastname: true,
            location: true,
            university: true,
            contact: true,
            about: true,
          },
        },
      },
    });

    return application;
  }
}
