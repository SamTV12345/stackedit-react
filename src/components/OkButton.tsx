import React, {FC, ReactNode} from "react";

export interface ButtonProps {
    onClick: ()=>void,
    children: ReactNode| ReactNode[],
    hide?: boolean
}

export const OkButton:FC<ButtonProps> = ({children,onClick, hide})=>{
    return <button type="button" onClick={onClick}
                   className={`${hide ? 'block' : 'hidden'} text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4
                    focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2
                     dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>{children}</button>
}
