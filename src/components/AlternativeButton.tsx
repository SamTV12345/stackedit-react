import React, {FC} from "react";
import {ButtonProps} from "./OkButton";

export const AlternativeButton:FC<ButtonProps> = ({children,onClick, hide})=>{
    return <button type="button" onClick={onClick}
                   className={`${hide ? 'block' : 'hidden'} text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>{children}</button>
}
