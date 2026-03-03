'use server'
import { redirect } from "next/navigation";
import { Data } from "../data"   
import { revalidatePath } from "next/cache";

export async function createTables() {
    await Data.createCustomersTable();
    await Data.createTaskTable();
    revalidatePath('/admin')
}

export async function createCustomer() {
    await Data.createCustomer({name: "admin", password: "admin"})
    revalidatePath('/admin')
}

export async function dropTables() {
    await Data.dropTaskTable();
    await Data.dropCustomerTable();
    revalidatePath('/admin')
}
export async function goHome() {
    redirect('/')
}

export async function testHasTable(): Promise<boolean> {
    const customerExists = await Data.testCustomerTable();
    const tasksExists = await Data.testTasksTable();

    return customerExists && tasksExists
}

export async function testHasCustomerOne(): Promise<boolean> {
    const user = await Data.findCustomerById(1);
    return user ? true : false
}