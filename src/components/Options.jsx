
"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import handleLogout from "../../lib/signOut";

const Options = (props) => {

    const [showOptions, setShowOptions] = useState(false);
    const router = useRouter();

    const logout = () => {
      if (handleLogout()) {
        router.push("/");
      }
    }

    return <>
    <div className="relative">
  <div
    className="inline-flex items-center overflow-hidden rounded-md border bg-white dark:border-gray-800 dark:bg-gray-900"
  >
    <a
        onClick={()=>setShowOptions(!showOptions)}
      href="#"
      className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:border-e-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
    >
      Options
    </a>

    <button
        onClick={()=>setShowOptions(!showOptions)}
      className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
    >
      <span className="sr-only">Menu</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>

  {showOptions?<div
    className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
    role="menu"
  >
    <div className="p-2">
      <a
        href="#"
        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        role="menuitem"
      >
        Change Password
      </a>



        <button
            onClick={()=>logout()}
          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-600/10"
          role="menuitem"
        >
            Logout          
        </button>
    </div>
  </div>:null}

</div>
    
    </>

}

export default Options;