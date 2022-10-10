import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  console.log(process.env.NODE_SERVER_PORT)
  await app.listen(process.env.NODE_SERVER_PORT)
}
bootstrap()
