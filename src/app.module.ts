import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StationModule } from './stations/station.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQLHOST || 'localhost',
      port: +process.env.MYSQLPORT || 3306,
      username: process.env.MYSQLUSER || 'amy',
      password: process.env.MYSQLPASSWORD || '1234',
      database: 'train_schedule',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    StationModule,
    RoutesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
