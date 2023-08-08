import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './util/exceptions/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 3000;
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

  await app.listen(port, () => {
    console.log('server running at ' + port);
  });
}
bootstrap();
