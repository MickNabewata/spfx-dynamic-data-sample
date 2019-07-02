/** 日付型を文字列型(yyyy/MM/dd)に変換 */
export function dateToString(date : Date) : string {
    let ret = '';

    if(date)
    {
        ret = `${padZero(date.getFullYear().toString(), 4)}/${padZero((date.getMonth()+1).toString(), 2)}/${padZero(date.getDate().toString(), 2)}`;
    }

    return ret;
}

/** 文字列型(yyyy/MM/dd)を日付型に変換 */
export function stringToDate(date : string) : Date | undefined {
    let ret : Date | undefined = undefined;

    if(date && date.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
        let temp = new Date(date);  
        if(temp.getFullYear() ==  parseInt(date.split("/")[0])
            && temp.getMonth() == parseInt(date.split("/")[1]) - 1
            && temp.getDate() == parseInt(date.split("/")[2])
        ){
            ret = temp;
        }
    }

    return ret;
}

/** ゼロ埋め */
function padZero(val : string, count : number = 1) : string {
    let ret = '';

    if(val)
    {
        for(let i = 0; i < count; i++) ret += '0';
        ret += val;

        let len = ret.length - count;
        ret = ret.substring((len > 0)? len : 0, len + count);
    }

    return ret;
}