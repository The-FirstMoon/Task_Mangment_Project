import { createCommentsTable } from "./Tables/coments_table";
import { createProjectsTable } from "./Tables/projects_table";
import { createTasksTable } from "./Tables/tasks_table";
import { createUsersTable } from "./Tables/users_tables";

export async function initDataBase() {
    await createUsersTable();
    await createProjectsTable();
    await createTasksTable();
    await createCommentsTable();

    console.log("The DataBase is ready");
}