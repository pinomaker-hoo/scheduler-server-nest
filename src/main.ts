import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use('/src/source/img', express.static('./src/source/img'))
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ limit: '50mb', extended: true }))
  await app.listen(process.env.NODE_SERVER_PORT)
}
bootstrap()
