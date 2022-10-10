import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { GroupModule } from './group/group.module'
import { GroupTodosModule } from './groupTodos/groupTodos.module'
import { GroupUserModule } from './groupUser/groupUser.module'
import { TodosModule } from './todos/todos.module'

@Module({
  imports: [
    AuthModule,
    TodosModule,
    GroupModule,
    GroupUserModule,

    GroupTodosModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
