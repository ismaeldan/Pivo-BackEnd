import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configura o passport-local para usar 'email' como usernameField
    super({ usernameField: 'email' }); 
  }

  // O Passport chama este método automaticamente com as credenciais do Body
  async validate(email: string, pass: string): Promise<any> {
    const user = await this.authService.validateUser(email, pass);
    if (!user) {
      // Se authService.validateUser retornar null, lança erro
      throw new UnauthorizedException('Credenciais inválidas.'); 
    }
    return user; // Se válido, retorna o objeto user (sem senha)
  }
}