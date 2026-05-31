import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faPen, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {useAppSelector} from "../store/hooks";
import {SaveStatus} from "../slices/CommonSlice";

const DISPLAY: Record<SaveStatus, {labelKey: string; icon: IconDefinition; className: string; spin?: boolean}> = {
    saved: {labelKey: 'save-status-saved', icon: faCircleCheck, className: 'text-green-400'},
    dirty: {labelKey: 'save-status-dirty', icon: faPen, className: 'text-yellow-400'},
    saving: {labelKey: 'save-status-saving', icon: faSpinner, className: 'text-gray-300', spin: true},
}

export const SaveStatusIndicator = () => {
    const {t} = useTranslation()
    const status = useAppSelector(state => state.commonReducer.saveStatus)
    const display = DISPLAY[status]

    return (
        <div className={`flex items-center gap-1 text-sm whitespace-nowrap ${display.className}`}
             data-testid="save-status" data-status={status} title={t(display.labelKey)}>
            <FontAwesomeIcon icon={display.icon} spin={display.spin}/>
            <span>{t(display.labelKey)}</span>
        </div>
    )
}
