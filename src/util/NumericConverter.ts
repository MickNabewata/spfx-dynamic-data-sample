export function stringToNumber(num : string) : number {

    let ret : number = undefined;

    if(num && num.match(/^[-]?([1-9]\d*|0)(\.\d+)?$/) != null) {
        ret = parseFloat(num);
    }

    return ret;
}