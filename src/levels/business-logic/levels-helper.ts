import { CharClasses } from "src/enum/charClasses"
import { CharLevelsDto } from "../dto/levels-dto";

export const updateListWithClassName = (list: CharLevelsDto[]) => {
    return list.map(level => {
        return {
            className: CharClasses[level.classID],
            ...level,
        }
    });
}