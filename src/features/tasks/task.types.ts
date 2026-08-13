export type status = "TODO" | "INPROGRESS" | "DONE";
export type priority = "LOW" | "MEDIUM" | "HIGH";

export interface TaskModel {
    id:number,
    title: string,
    description: string,
    status: status,
    priority: priority,
    assigned_user_id: number,
    project_id: number  
}