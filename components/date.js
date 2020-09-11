import { parseISO, format } from 'date-fns' //npm i date-fns

export default function Date({ dateString }) {
    /*
    function use the date-fns library to parse a string into a date
    format and return it
    */
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
  }