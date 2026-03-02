'use client'
import { ac_set_task_completed } from "@/lib/actions";
import { refresh } from "next/cache";

export default function CheckButton({id, completed}: {id: number, completed: boolean}) {
  return (
    <div
      onClick={() => {ac_set_task_completed(id, !completed)}}
      className="w-8 h-8 shadow-[0px_0px_1px_1px] mx-4 flex items-center justify-center"
    >
      {completed ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f"
        >
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
      ) : (
        <></>
      )}
    </div>
  );
}
