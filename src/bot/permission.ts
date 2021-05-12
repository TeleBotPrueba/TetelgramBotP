import fs from 'fs';

export function isAllawed(id: number): boolean{
    let ids: Array<string> = fs.readFileSync('./allowed.txt','utf8').split('\n');
    return !!ids.find(allowed_id => Number.parseInt(allowed_id)===id)
}