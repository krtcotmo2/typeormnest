export const categorizeACS = (categories: any[], points: any[]) => {
    const refinedData = categories.map(cat=> {
        const catPoints = points.filter(point => point.acID === cat.acID)
        console.log(cat)
        return {
            name: cat.acDesc,
            values: catPoints.sort((val1, val2) => {
                return val1.sortOrder < val2.sortOrder ? -1 : 1;
            }),
            score:catPoints.reduce((startingValue, point) => startingValue + point.score, 0),
        }
    });
    return refinedData;
}