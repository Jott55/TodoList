import { admin } from "@/lib/admin/external";
import { redirect } from "next/navigation";
import CheckButton from "@/components/TaskBox/CheckButton";
import { testHasTable } from "@/lib/admin/admin";

export async function CheckBox({ checked }: { checked: boolean }) {
  return (
    <div className="w-8 h-8 shadow-[0px_0px_1px_1px] mx-4 flex items-center justify-center">
      {checked ? (
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

export default async function AdminPage() {

    const tables = await admin.testHasTable();
    const hasCustomer1 = await admin.testHasCustomerOne()

  
    return (
    <div className="flex flex-col mx-auto w-1/2 text-2xl bg-gray-100 p-8 leading-relaxed">
      <p>First for creating the tables in the Database</p>
      <p>Your <strong>.env</strong> file at root dir must have the Postgres Url like this</p>
      <p>POSTGRES_URL=&lt;postgres...&gt;</p>
      <p>The site only counts for the first customer in the database</p>
      <p>
        so for now, it has to have a customer with ID=1 to work
      </p>
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <div className="flex items-center">
            <button
              className="flex-1 bg-gray-500 text-white hover:bg-gray-700 active:bg-gray-300 border"
              onClick={admin.dropTables}
            >
              Drop all tables
            </button>
            <CheckBox checked={!tables} />
          </div>
          <div className="flex items-center">
            <button
              className="flex-1 bg-gray-500 text-white hover:bg-gray-700 active:bg-gray-300 border"
              onClick={admin.createTables}
            >
              Create tables
            </button>
            <CheckBox checked={tables} />
          </div>

          <div className="flex items-center">
            <button
              className="flex-1 bg-gray-500 text-white hover:bg-gray-700 active:bg-gray-300 border"
              onClick={admin.createCustomer}
            >
              Create customer id 1
            </button>
            <CheckBox checked={hasCustomer1} />
          </div>
        </div>
        <div className="flex flex-col mx-auto justify-center">
          <button
            onClick={admin.goHome}
            className="bg-slate-300 p-4 border rounded hover:bg-slate-400 active:bg-slate-500"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
