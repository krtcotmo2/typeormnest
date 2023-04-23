import { CharClassesDTO } from "../dto/char-classes-dto";

export const calcSavesAndHitsForEachClass = (
    stats: CharClassesDTO[], 
    classes: string[],
    levels: string[]
) => {
    return stats.map((stat, i) => {
        const lvl = levels[i];
        const cls = stats.find(c => c.classID === +classes[i])
        return {
            class: cls.className,
            level: +lvl,
            toHit: Math.ceil(
                cls.toHitBase + ((cls.toHitPercentage/100) * Math.max((+lvl - cls.toHitOffset), 0))
            ),
            fort: Math.ceil(
                cls.fortBase + ((cls.fortPercentage/100) * Math.max((+lvl  - cls.fortOffset), 0))
            ),
            reflex: Math.ceil(
                cls.reflexBase + ((cls.reflexPercentage/100) * Math.max((+lvl  - cls.reflexOffset), 0))
            ),
            will: Math.ceil(
                cls.willBase + ((cls.willPercentage/100) * Math.max((+lvl  - cls.willOffset), 0))
            )
        }
    })
}

