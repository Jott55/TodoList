import postgres from "postgres";
import { Customer, Task, TaskRaw, TestTable } from "./types";
import { refresh } from "next/cache";

const sql = postgres(process.env.POSTGRES_URL!)

export class Data {

    static async getTasks(customer_id: number) {
        try {

            const data = await sql<TaskRaw[]>`
            SELECT tasks.id, tasks.completed, tasks.content
            FROM tasks
            WHERE tasks.customer_id=${customer_id}
            ORDER BY id
            `
            return data
        } catch(err) {
            return null
        }
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

    static async dropCustomerTable() {
        await sql`
            DROP TABLE customers
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

    static async testCustomerTable() {
        const res = await sql<TestTable[]>`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema='public'
                AND table_name='customers'
            )
        `

        return res[0].exists;
    }

    static async testTasksTable() {
        const res = await sql<TestTable[]>`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema='public'
                AND table_name='tasks'
            )
        `

        return res[0].exists;
    }

    static async findCustomerById(id: number): Promise<Customer | null> {
        try {

            const userRow = await sql<Customer[]>`SELECT username, password FROM customers WHERE id=${id}`
            if (userRow.length === 1) {
                return userRow[0]
            }
            return null
        } catch (err) {
            return null
        }
        
    }
}
