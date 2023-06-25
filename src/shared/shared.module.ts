import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
  ],
  exports: ['PrismaService'],
})
export class SharedModule {}
