import { TaskStatus } from 'src/db/schema';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    columnId?: string;
    order?: number;
    status?: TaskStatus;
}
