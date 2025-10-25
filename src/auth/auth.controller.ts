import { Controller, Post, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard'; // Importe o Guard (vamos criar)

@Controller('auth') // Rota base: /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // --- ROTA DE LOGIN ---
  // POST /auth/login
  @UseGuards(LocalAuthGuard) // 1. Aplica o Guard que ativa a LocalStrategy
  @Post('login')
  @HttpCode(HttpStatus.OK) // Retorna 200 OK em vez de 201 Created
  async login(@Request() req) {
    // 2. Se o LocalAuthGuard passar (usuário válido), 
    //    a LocalStrategy terá anexado o objeto 'user' ao 'req'.
    // 3. Passamos esse 'user' para o authService.login para gerar o token.
    return this.authService.login(req.user); 
  }
}