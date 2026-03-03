'use server'
import { ac_create_task, ac_delete_task, ac_fetch_customer_task, ac_set_task_completed } from "@/lib/actions"
import TaskBox from "./TaskBox/TaskBox";
import { TaskRaw } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import TaskBoxContainer from "./TaskBoxContainer";
import TaskBoxContainerSkeleton from "./TaskBoxContainerSkeleton";

export async function TodoList() {
  async function form_action(form: FormData) {
    'use server'
    await ac_create_task(form)
    revalidatePath('/')
  }
    return (
    <div className="flex h-screen items-center">
      <div className="flex flex-col mx-auto w-lg h-8/10 shadow-lg ">
        <div className="flex justify-center p-8">
          <h1 className="text-6xl font-black ">Todo List</h1>
        </div>
        <form className="flex items-center justify-center mb-4 " action={form_action}>
          <input className="border-b-2 mr-4 focus:outline-0" placeholder="eating hamburger" type="text" name="content" min={3} max={32} />
          <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          </button>
        </form>
        <div className="overflow-auto max-h-full">
          <Suspense fallback={<TaskBoxContainerSkeleton />}>
            <TaskBoxContainer />
          </Suspense>
        </div>
      </div>
    </div>
    )
}