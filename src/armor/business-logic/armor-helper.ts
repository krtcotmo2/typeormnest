export const categorizeACS = (categories: any[], points: any[]) => {
    const refinedData = categories.map(cat=> {
        const catPoints = points.filter(point => point.acID === cat.acID)
        return {
            acID: cat.acID,
            name: cat.acDesc,
            values: catPoints.sort((val1, val2) => {
                return val1.sortOrder < val2.sortOrder ? -1 : 1;
            }),
            pinned: cat.pinned,
            sortOrder: cat.sortValue,
            score:catPoints.reduce((startingValue, point) => startingValue + point.score, 0),
        }
    });
    return refinedData.sort((a,b) => {
        if(a.sortOrder < b.sortOrder){
            return -1;
        }else if(a.sortOrder > b.sortOrder){
            return 1;
        } else {
            if(a.name < b.name){
                return -1;
            } else {
                return 1;
            }
        }
    });
}