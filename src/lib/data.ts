import postgres from "postgres";
import { Customer, Task, TaskRaw } from "./types";
import { refresh } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!)

export class Data {

    static async getTasks(customer_id: number) {
        const data = await sql<TaskRaw[]>`
        SELECT tasks.id, tasks.completed, tasks.content
        FROM tasks
        WHERE tasks.customer_id=${customer_id}
        ORDER BY id
        `
        return data
    }


    static async createCustomersTable() {
        await sql` CREATE TABLE customers (
            id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username VARCHAR(64),
            password VARCHAR(64)
            );
            `
    }
    static async createCustomer(customer: Customer) {
        await sql`
            INSERT INTO customers (username, password)
            VALUES (${customer.name}, ${customer.password})
            `
    }

    static async createTaskTable() {
        await sql`
            CREATE TABLE tasks (
                id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                customer_id bigint REFERENCES customers,
                completed BOOLEAN,
                content VARCHAR(64)
                );
                `
    }

    static async createTask(task: Task) {
        await sql<TaskRaw[]>`
                INSERT INTO tasks (customer_id, completed, content) 
                VALUES (${task.customer_id}, ${task.completed}, ${task.content}); 
                `
    }

    static async dropTaskTable() {
        await sql`
            DROP TABLE tasks
        `
    }

    static async delete_task(customer_id: number, task_id: number) {
        await sql`
            DELETE FROM tasks WHERE tasks.customer_id=${customer_id} AND tasks.id=${task_id}
        `
    }


    static async update_task_completed(customer_id: number, task_id: number, completed: boolean) {
        await sql`
            UPDATE tasks SET completed=${completed} WHERE customer_id=${customer_id} AND id=${task_id}
        `
    }
}
