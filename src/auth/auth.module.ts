import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => { 
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<number>('JWT_EXPIRATION');

        if (!secret) {
          throw new Error('JWT_SECRET não está definido nas variáveis de ambiente!');
        }
        if (!expiresIn) {
          throw new Error('JWT_EXPIRATION não está definido nas variáveis de ambiente!');
        }
        
        const options: JwtModuleOptions = {
          secret: secret,
          signOptions: {
            expiresIn: expiresIn,
          },
        };
        
        return options;
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}