'use server'
import { TodoList } from "@/components/TodoList";
import { redirect } from "next/navigation";


export async function goToAdmin() {
  redirect('/admin')
}


export default async function Home() {
  return (
    <div>
      <TodoList />
      <div className="flex flex-col fixed top-10 right-10">
        <button onClick={goToAdmin} className="bg-slate-300 p-4 border rounded hover:bg-slate-400 active:bg-slate-500">Admin</button>
      </div>
    </div>
  );
}
