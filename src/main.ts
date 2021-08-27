import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './common/config/config.service';
import { swaggerOptions } from './common/config/swagger.config';
import { AllExceptionsFilter } from './common/exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import * as AWS from 'aws-sdk';

const port = configService.getPort();
const apiPrefix = configService.getApiPrefix();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix(apiPrefix);
  app.enableCors();

  AWS.config.update({
    accessKeyId: configService.getAwsAccessKeyId(),
    secretAccessKey: configService.getAwsSecretAccessKey(),
    region: configService.getAwsRegion(),
  });

  // Swagger docs configuration
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);
  
  await app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}
bootstrap();
