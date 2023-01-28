import {File} from "../slices/CommonSlice";

export const isFile = (object:  unknown): object is File=> {
    return object!=undefined &&  typeof object == "object" && 'id' in object && 'name' in object && 'content' in object && 'lastOpened' in object
}
