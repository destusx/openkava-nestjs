import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const isProduction = process.env.NODE_ENV === 'production';

    const host = isProduction ? '0.0.0.0' : 'localhost';
    const port = process.env.PORT || 4444;

    await app.listen(port, host);
}
bootstrap();
