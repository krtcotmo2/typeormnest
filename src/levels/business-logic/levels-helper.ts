import { CharClasses } from "src/enum/charClasses"

export const updateListWithClassName = (list: any[]) => {
    return list.map(level => {
        return {
            className: CharClasses[level.classID],
            ...level,
        }
    });
}