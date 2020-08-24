import moment from 'moment';
import 'moment/locale/pt-br';

moment.updateLocale('pt-br', {
  relativeTime: {
    future: 'em %s',
    past: '%s',
    s: 'agora',
    ss: '%d seg',
    m: '1 min',
    mm: '%d min',
    h: '1h',
    hh: '%dh',
    d: '1 dia',
    dd: '%d dias',
    M: '1 mês',
    MM: '%d meses',
    y: '1 ano',
    yy: '%d anos',
  },
});

export default moment;
