export function formatGmt(gmtOffset: number) {
    let gmt = (gmtOffset / 3600).toFixed(2);
    if (!gmt.startsWith('-')) {
        gmt = `+${gmt}`;
    }

    const signal = gmt.substring(0, 1);
    let value = gmt.substring(1);
    if (value.length === 4) {
        value = `0${value}`;
    }

    const hour = value.split('.')[0];
    let minute = value.split('.')[1];
    minute = (60 * Number(`0.${minute}`)).toFixed(0);
    if (minute.length === 1) {
        minute = "0" + minute;
    } 

    return `GMT ${signal}${hour}:${minute}`;
}