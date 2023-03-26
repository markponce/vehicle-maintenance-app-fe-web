import { formatInTimeZone } from 'date-fns-tz'

export const formatInTimeZoneUtil = (
    timestamp: number,
    format = 'yyyy-MM-dd HH:mm:ssXXX',
    tz = '',
) => {
    if (tz == null) {
        tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    return formatInTimeZone(new Date(timestamp * 1000), tz, format) // 2014-10-25 06:46:20-04:00
}
