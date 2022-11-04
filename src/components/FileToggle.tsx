import {ControlledMenu, MenuItem, useMenuState} from "@szhsin/react-menu";
import {FC, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {deleteFile} from "../database/FileLib";

export interface FileToggleProps {
    children:any,
    keyVal:string
}

export const FileToggle:FC<FileToggleProps> = ({children, keyVal})=>{
    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return <div key={keyVal} onContextMenu={e => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu(true);
    }} className="col-span-4 grid grid-cols-4 gap-4">
        {children}

        <ControlledMenu {...menuProps} anchorPoint={anchorPoint} className="col-span-3"
                        direction="right" onClose={() => {
                            toggleMenu(false)
        }}
        >
            <MenuItem className="bg-slate-900	 list-none p-2  grid-none" onClick={()=>
                deleteFile(keyVal)
            }>
                <FontAwesomeIcon icon={faTrash} className="text-red text-2xl"/>Delete
            </MenuItem>
        </ControlledMenu>
    </div>
}
