import TaskBox from "./TaskBox/TaskBox";
import TaskBoxSkeleton from "./TaskBox/TaskBoxSkeleton";

export default async function TaskBoxContainerSkeleton() {
    return (
        <>
            <TaskBoxSkeleton content="Loading please wait..." />
        </>
    )
}