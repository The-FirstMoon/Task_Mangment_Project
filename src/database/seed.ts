import { createCommentsTable } from "./migrations/coments_table";
import { createProjectsTable } from "./migrations/projects_table";
import { createTasksTable } from "./migrations/tasks_table";
import { createUsersTable } from "./migrations/users_tables";

export async function initDataBase() {
    await createUsersTable();
    await createProjectsTable();
    await createTasksTable();
    await createCommentsTable();

    console.log("The DataBase is ready");
}