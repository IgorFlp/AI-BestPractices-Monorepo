import { Module } from '@nestjs/common';
import { CfpController } from './cfp.controller';

@Module({
  controllers: [CfpController],
})
export class CfpModule {}
