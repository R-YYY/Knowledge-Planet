export function compareByDesc(property) {
    return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value2 < value1 ? -1 : 1;
    }
}

export function compareByAsc(property) {
    return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value1 < value2 ? -1 : 1;
    }
}

export function compareCompetition(){
    return function (a,b){
        var now = new Date()
        var aStart = new Date(a.startTime)
        var aEnd = new Date(a.endTime)
        var bStart = new Date(b.startTime)
        var bEnd = new Date(b.endTime)
        //a b 状态相同
        if( (aStart > now && bStart > now) ||
            (aStart < now && aEnd > now && bStart < now && bEnd > now) ||
            (aEnd < now && bEnd < now)){
            return bStart - aStart
        }
        //a没开始
        else if(aStart > now){
            return -1
        }
        //b没开始
        else if(bStart > now){
            return 1;
        }
        //a进行中，b已结束
        else if(aStart < now && aEnd > now && bEnd < now){
            return -1
        }
        //a已结束，b进行中
        else if(aEnd < now && bStart < now && bEnd > now){
            return 1;
        }
    }
}
