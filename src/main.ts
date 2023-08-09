import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './util/exceptions/http.exception';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      forbidUnknownValues: false,
      transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: false,
      validationError: { value: true },
      transform: true,
      exceptionFactory: (errors) => {
        throw new UnprocessableEntityException({
          message: 'invalid data provided',
          errors: errors
            .map(({ property, constraints }) => {
              const response: object = {};
              response[`${property}`] = Object.values(constraints);
              return response;
            })
            .reduce((a, v) => ({ ...a, ...v }), {}),
        });
      },
    }),
  );
  const conf = new DocumentBuilder()
    .setTitle('Book Collection Service')
    .setDescription('API Documentation for Chatbot')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, conf);
  SwaggerModule.setup('', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port, () => {
    console.log('server running at ' + port);
  });
}
bootstrap();
