import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { MongoModule } from './modules/mongo/mongo.module';
import { RegisterModule } from './modules/auth/register/register.module';
import { AuthModule } from './modules/auth/auth.module';

export const swagger = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Event Management')
    .setDescription(
      'API Documentation \
      \nNOTE: The API with (LOCK) symbol can be used only after providing token in (Authorize).\
      \nParameter with * are required to execute related API.',
    )
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey', name: 'x-access-token', in: 'header' })
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    deepScanRoutes: true,
    include: [AppModule, MongoModule, RegisterModule, AuthModule],
  });
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Event Management API',
    explorer: false,
  });
};
