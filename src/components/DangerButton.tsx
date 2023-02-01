import React, {FC} from "react";
import {ButtonProps} from "./OkButton";

export const DangerButton:FC<ButtonProps> = ({children,onClick, hide})=>{
    return <button type="button" onClick={onClick}
    className={`${hide?'block':'hidden'} text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}>{children}</button>
}
