import { priority, status } from "./task.types";

export interface TaskDTO {
    title: string,
    description: string,
    status: status,
    priority: priority,
    assignedUserId: number,
    projectId: number
}

export interface editTaskDTO {
    title?: string,
    description?: string,
    status?: status,
    priority?: priority,
    assignedUserId?: number,
    projectId?: number
}

