'use server'
import { ac_delete_task, ac_set_task_completed } from "@/lib/actions";
import { TaskBoxValues } from "@/lib/types";
import CheckButton from "./CheckButton";
import DeleteButton from "./DeleteButton";
import { Suspense } from "react";


export default async function TaskBox({ id, completed, content}: TaskBoxValues) {
  return (
    <div className="mb-4 mx-4">
      <hr />
      <div className="font-sans mt-4 flex items-center text-2xl p-4">
        <div className="flex flex-1">
          <CheckButton completed={completed} id={id} />
        <p className="font-bold">{content}</p>
        </div>
          <DeleteButton id={id} />
      </div>
    </div>
  );
}
