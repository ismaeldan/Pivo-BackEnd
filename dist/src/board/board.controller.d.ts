import { BoardService } from './board.service';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    getBoard(): Promise<{
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
