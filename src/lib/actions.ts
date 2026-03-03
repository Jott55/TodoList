"use server"
import { error } from "console";
import { Data } from "./data"
import { z } from 'zod'
import { Task } from "./types";
import { refresh, revalidatePath } from "next/cache";

export async function ac_fetch_customer_task() {
    const data = await Data.getTasks(1)
    return data
}

export async function ac_create_task(formData: FormData): Promise<Task | null> {    
    const taskSchema = z.object({
        content: z.string().trim().min(3).max(32)
    })

    const form = taskSchema.safeParse({
        content: formData.get('content')
    })

    if (!form.success) {
        return null
    }

    let task: Task = {
        completed: false,
        customer_id: 1,
        content: form.data.content
    };

    await Data.createTask(task);
    return task
}

export async function ac_delete_task(id: number) {
    await Data.delete_task(1, id);
    refresh()
}

export async function ac_set_task_completed(id: number, completed: boolean) {
    await Data.update_task_completed(1, id, completed)
    refresh()
}