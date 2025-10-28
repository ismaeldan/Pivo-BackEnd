import type { DbType } from 'src/db/db.module';
export declare class BoardService {
    private db;
    constructor(db: DbType);
    getBoardData(authorId: string): Promise<{
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
