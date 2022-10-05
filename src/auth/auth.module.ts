import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [],
  controllers: [],
})
export class AuthModule {}
