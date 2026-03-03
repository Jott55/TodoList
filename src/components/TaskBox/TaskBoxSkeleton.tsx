'use server'
import { TaskBoxValues } from "@/lib/types";
import CheckButton from "./CheckButton";
import DeleteButton from "./DeleteButton";
import CheckButtonSkeleton from "./CheckButtonSkeleton";
import DeleteButtonSkeleton from "./DeleteButtonSkeleton";


export default async function TaskBoxSkeleton({content} : {content: string}) {
  return (
    <div className="mb-4 mx-4">
      <hr />
      <div className="font-sans mt-4 flex items-center text-2xl p-4">
        <div className="flex flex-1">
          <CheckButtonSkeleton />
        <p className="font-bold">{content}</p>
        </div>
          <DeleteButtonSkeleton />
      </div>
    </div>
  );
}
