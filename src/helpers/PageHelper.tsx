

export function getQuery(url:string, q:string) {
    return (url.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
 }
