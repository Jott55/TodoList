import { ac_fetch_customer_task } from "@/lib/actions"
import TaskBox from "./TaskBox/TaskBox";
import TaskBoxContainerSkeleton from "./TaskBoxContainerSkeleton";
import TaskBoxSkeleton from "./TaskBox/TaskBoxSkeleton";

export default async function TaskBoxContainer() {
    
    const tasks = await ac_fetch_customer_task();
    
    if (!tasks) {
        return <TaskBoxSkeleton content="Please enter the admin page" />
    }

    return (
        <>
          {tasks.map(task => <TaskBox key={task.id} id={task.id} completed={task.completed} content={task.content} />) }
        </>
    )
}