import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
// Importe JwtModuleOptions para tipagem explícita
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // Explicitamente dizemos que a factory retorna uma Promise de JwtModuleOptions
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => { 
        const secret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<number>('JWT_EXPIRATION');

        if (!secret) {
          throw new Error('JWT_SECRET não está definido nas variáveis de ambiente!');
        }
        if (!expiresIn) {
          throw new Error('JWT_EXPIRATION não está definido nas variáveis de ambiente!');
        }

        // Criamos um objeto explicitamente tipado como JwtModuleOptions
        const options: JwtModuleOptions = {
          secret: secret, // Não precisa mais do '!' por causa da verificação acima
          signOptions: {
            expiresIn: expiresIn, // Não precisa mais do '!' por causa da verificação acima
          },
        };
        
        return options; // Retornamos o objeto tipado corretamente
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}