export function addDays(date, daysToAdd){
    const dateClone = new Date(date);
    dateClone.setDate(date.getDate() + daysToAdd);

    return dateClone;
}

export function getWeek(forDate, daysOffset = 0){
    const date = addDays(forDate, daysOffset);
    const day = date.getDay();

    const start = addDays(date, -day);
    const end = addDays(date, 6 - day);
       
    return { date, start, end }
}

export function shortISO(date){
    return date.toISOString().split('T')[0];
}

export const isDate = date => !isNaN(Date.parse(date));
