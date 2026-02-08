import * as moment from 'moment';

export default class Date {
  public addDate(duration, type) {
    return moment().add(duration, type);
  }
  public addDateByInputDate(duration, type, inputDate) {
    return moment(inputDate).add(duration, type).format();
  }
}
