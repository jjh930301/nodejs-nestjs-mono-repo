import * as dayjs from 'dayjs';
import * as updateLocale from 'dayjs/plugin/updateLocale';
import * as weekday from 'dayjs/plugin/weekday';
import * as localeData from 'dayjs/plugin/localeData';
import * as isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(isBetween);

dayjs.updateLocale('en', {
  weekdays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
});
class DayJs {
  /**
   * @description Get current day of the week such as SUN, MON, TUE, WED, THU, FRI, SAT
   */
  static getWeekday() {
    return dayjs.weekdays()[dayjs().get('day')];
  }

  /**
   * @description Return true if the current time is between start and end. accepts string format such as 'HH:mm:ss'
   */
  static isNowBetweenGivenHours(start: string, end: string) {
    return (
      dayjs()
        .hour(+start.split(':')[0])
        .minute(+start.split(':')[1])
        .second(+start.split(':')[2]) < dayjs() &&
      dayjs()
        .hour(+end.split(':')[0])
        .minute(+end.split(':')[1])
        .second(+end.split(':')[2]) > dayjs()
    );
  }

  /**
   * @description Get dayjs instance
   */
  static getDayJs() {
    return dayjs;
  }
}

export default DayJs;
