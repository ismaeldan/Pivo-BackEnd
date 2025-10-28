import { BoardService } from './board.service';
interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
    };
}
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    getBoard(req: AuthenticatedRequest): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        tasks: {
            id: string;
            createdAt: Date | null;
            title: string;
            order: number;
            authorId: string;
            description: string | null;
            columnId: string;
            status: "pending" | "in_progress" | "completed";
        }[];
    }[]>;
}
export {};
