import {
  Inject,
  Injectable,
  UseGuards,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import getStatus from 'src/statuses';

@Injectable()
@UseGuards(JwtAuthGuard)
export class InitiativesService {
  constructor(@Inject('PrismaService') private prisma: PrismaService) {}

  async createInitiative(
    userId: string,
    createInitiativeDto: CreateInitiativeDto,
  ) {
    const initiative = await this.prisma.initiative.create({
      data: {
        ...createInitiativeDto,
        user: { connect: { id: userId } },
      },
    });

    return initiative;
  }

  async getInitiatives(userId: string) {
    const initiatives = await this.prisma.initiative.findMany({
      where: {
        userId,
      },
    });

    const formattedInitiatives = initiatives.map((initiative) => {
      const status = getStatus(initiative.status);

      if (!status) throw new Error('Unhandled formatting.');

      return {
        ...initiative,
        statusText: status.statusText,
        statusColor: status.statusColor,
      };
    });

    return formattedInitiatives;
  }

  async getInitiativeById(initiativeId: string, currentUserId: string) {
    const initiative = await this.prisma.initiative.findUnique({
      where: {
        id: initiativeId,
      },
    });

    if (!initiative) throw new NotFoundException();

    return { ...initiative, canEdit: currentUserId === initiative.userId };
  }

  async getInitiativeApplication(initiativeId: string, currentUserId: string) {
    const initiativeWithApplications = await this.prisma.initiative.findUnique({
      where: {
        id: initiativeId,
      },
      include: {
        Application: {
          select: {
            id: true,
            status: true,
            applier: {
              select: {
                name: true,
                lastname: true,
              },
            },
          },
        },
      },
    });

    if (!initiativeWithApplications) throw new NotFoundException();

    if (initiativeWithApplications.userId !== currentUserId)
      throw new ForbiddenException();

    return initiativeWithApplications.Application;
  }
}
