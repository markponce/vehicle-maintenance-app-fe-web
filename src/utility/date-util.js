import { formatInTimeZone } from 'date-fns-tz'

export const formatInTimeZoneUtil = (
    timestamp,
    format = 'yyyy-MM-dd HH:mm:ssXXX',
    tz = null,
) => {
    if (tz == null) {
        tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    return formatInTimeZone(new Date(timestamp * 1000), tz, format) // 2014-10-25 06:46:20-04:00
}
