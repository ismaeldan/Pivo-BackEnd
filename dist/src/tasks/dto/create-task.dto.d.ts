import { TaskStatus } from 'src/db/schema';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    columnId: string;
    order?: number;
    status?: TaskStatus;
}
