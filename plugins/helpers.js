import basketballIcon from 'assets/images/basketball.svg';
import netballIcon from 'assets/images/netball.svg';
import { format } from 'date-fns';
import { get } from 'lodash';

export default (ctx, inject) => {
  inject('helpers', {
    currency(value) {
      return `£${value.toFixed(2)}`;
    },

    sportIcon(slug) {
      return get({
        basketball: basketballIcon,
        netball: netballIcon,
      }, slug);
    },

    formatDate(date, formatString) {
      return format(new Date(date), formatString);
    }
  });
}