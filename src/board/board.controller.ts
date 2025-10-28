import { Controller, Get, UseGuards, Request} from '@nestjs/common';
import { BoardService } from './board.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBoard(@Request() req: AuthenticatedRequest,) {
    
    const userId = req.user.userId;
    return this.boardService.getBoardData(userId);
  }
}