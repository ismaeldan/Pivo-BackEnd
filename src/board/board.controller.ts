import { Controller, Get} from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getBoard() {
    
    const mockUserId = 'hk099xu4p7ax87ktaoy7ezr2'; 
    return this.boardService.getBoardData(mockUserId);
  }
}