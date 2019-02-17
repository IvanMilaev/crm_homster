const pool = require('../database');
const moment = require('moment');
const _ = require('lodash');

const dateOrder = (unordered) => {
  const ordered = {}
  Object.keys(unordered).sort().map((key) => {
    ordered[key] = unordered[key]
  })
  return ordered;
}
module.exports = () => {
  const DirectorAnalytic = {}

  DirectorAnalytic.getAnalytic = async ({  stdate, fndate }) => {
    const analytica = {
      zavedenieByDay: {},
      zameriByDay: {},
      dogovoraByDay: {},
      zavedenieByMonth: {
        info: {
          title: 'Количество обращений по месяцам',
          description: ` Сумированное количество заказов помесячно`
        },
        data:{},
        typeLabels: "month"
      },
      conversionZamerByDay: {
        info: {
          title: 'Конверсия записи на замер по дням за период',
          description: `График формируется следующим образом: считается количество заведенных заявок за каждый день указанного периода.
          Если в какой-либо день заявки не создавались, то день конечно же не учитывается. Далее, из этих созданных считаются
          записанные на замер. Причем не важно когда записанные на замер (то есть совершенно не обязательно записанные в указанный период).
          Далее считается конверсия по дням - делим количество замеров на количество заведнных за день и умножаем на 100 и округляем до целых.
          `
        },
        data:{},
        typeLabels: "day"
      },
      conversionDogovorByDay: {
        info: {
          title: 'Конверсия заключенных договоров по дням за период',
          description: `График формируется следующим образом: считается количество заведенных заявок за каждый день указанного периода.
          Если в какой-либо день заявки  не создавались, то день конечно же не учитывается. Далее, из этих созданных считаются
          заключенные. Причем не важно когда заключенные (то есть совершенно не обязательно заключенные в указанный период).
          Далее считается конверсия по дням - делим количество заключенных на количество заведнных за день и умножаем на 100 и округляем до целых.
          `
        },
        data:{},
        typeLabels: "day"
      },
      sumDogovorByMonth: {
        info: {
          title: 'Общие суммы договоров помесячно',
          description: `Суммируются суммы договоров за месяца указанные в периоде. (день в периоде не имеет значения - дата округляется до месяца).
          Заявки группируются по месяцам по дате создания.
          Вертикальная шкала - количество миллионов руб
          `
        },
        data:{},
        typeLabels: "month"
      },
      istochnikiByPeriod : {
        info:{
          title: 'Распределение по источникам заявок - звонки, почта и другое',
          description: 'Описание',
        },
        data: {},
        typeLabels: "guide"
      },
      avgSumDogovorByMonth: {
        info: {
          title: 'Средний чек помесячно',
          description: `Средннее значение суммы договоров за каждый месяц в периоде
          Заявки группируются по месяцам по дате создания. 
          Вертикальная шкала - количество тысяч руб
          `
        },
        data:{},
        typeLabels: "month"
      },

    }


    /* p_4_s - дата начала замера
     _ts_create - дата создания заявки
     c_23 - дата заключения договора
     _active - статус заявки - 0 -удалена 1 - активная 2 - в архиве
    */
    ////// аналитика записи на замер по каждому дню в указанном периоде

    ///////ЗАВЕДЕНИЕ
    //рабочая таблица
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count
    FROM tickets_19   WHERE c_19!=194 &&   date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d') && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
    GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.zavedenieByDay[res.day] = res.count
    })

    // архив 1
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count
    FROM tickets_19_arhiv  WHERE c_19!=194 &&   date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d') && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
    GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.zavedenieByDay[res.day] === undefined ?
      analytica.zavedenieByDay[res.day] = res.count :
      analytica.zavedenieByDay[res.day] = parseInt(analytica.zavedenieByDay[res.day], 10) + parseInt(res.count)
    })

    // архив 2
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count
    FROM tickets_19_archiv_ok  WHERE c_19!=194 &&   date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d') && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
    GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.zavedenieByDay[res.day] === undefined ?
      analytica.zavedenieByDay[res.day] = res.count :
      analytica.zavedenieByDay[res.day] = parseInt(analytica.zavedenieByDay[res.day], 10) + parseInt(res.count)
    })

    // удаленные
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count
    FROM tickets_19_deleted  WHERE c_19!=194 &&   date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d') && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
    GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.zavedenieByDay[res.day] === undefined ?
      analytica.zavedenieByDay[res.day] = res.count :
      analytica.zavedenieByDay[res.day] = parseInt(analytica.zavedenieByDay[res.day], 10) + parseInt(res.count)
    })

    //////////ЗАМЕРЫ
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count FROM tickets_19
      WHERE c_19!=194 &&   p_4_s!="0000-00-00 00:00:00" &&  date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d')  && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
     GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.zameriByDay[res.day] = res.count
    })

    // архив 1
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count FROM tickets_19_arhiv
      WHERE c_19!=194 &&   p_4_s!="0000-00-00 00:00:00" &&  date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d')  && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
     GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.zameriByDay[res.day] === undefined ?
      analytica.zameriByDay[res.day] = res.count :
        analytica.zameriByDay[res.day] = parseInt(analytica.zameriByDay[res.day], 10) + parseInt(res.count)
    })

    // архив 2
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count FROM tickets_19_archiv_ok
      WHERE c_19!=194 &&   p_4_s!="0000-00-00 00:00:00" &&  date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d')  && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
     GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.zameriByDay[res.day] === undefined ?
      analytica.zameriByDay[res.day] = res.count :
        analytica.zameriByDay[res.day] = parseInt(analytica.zameriByDay[res.day], 10) + parseInt(res.count)
    })

    // удаленные
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count FROM tickets_19_deleted
      WHERE c_19!=194 &&   p_4_s!="0000-00-00 00:00:00" &&  date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d')  && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
     GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.zameriByDay[res.day] === undefined ?
      analytica.zameriByDay[res.day] = res.count :
      analytica.zameriByDay[res.day] = parseInt(analytica.zameriByDay[res.day], 10) + parseInt(res.count)
    })




    Object.keys(analytica.zavedenieByDay).map(day => {
      analytica.conversionZamerByDay.data[day] = analytica.zameriByDay[day] !== undefined ? Math.round(analytica.zameriByDay[day] / analytica.zavedenieByDay[day] * 100) : 0
    })

    //////

    ////// аналитика заключенных договоров по каждому дню в указанном периоде

    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count FROM tickets_19
      WHERE c_19!=194 &&   c_23!="0000-00-00 00:00:00" && _active!=0 &&  date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d')  && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
     GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.dogovoraByDay[res.day] = res.count
    })

    //архив 1
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count FROM tickets_19_arhiv
      WHERE c_19!=194 &&   c_23!="0000-00-00 00:00:00" && _active!=0 &&  date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d')  && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
     GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.dogovoraByDay[res.day] === undefined ?
      analytica.dogovoraByDay[res.day] = res.count :
      analytica.dogovoraByDay[res.day] = parseInt(analytica.dogovoraByDay[res.day], 10) + parseInt(res.count)

    })

    //архив 2
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m-%d') as day , COUNT(*) as count FROM tickets_19_archiv_ok
      WHERE c_19!=194 &&   c_23!="0000-00-00 00:00:00" && _active!=0 &&  date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d')  && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
     GROUP BY date_format(_ts_create,'%Y-%m-%d')`
    )

    result.map(res => {
      analytica.dogovoraByDay[res.day] === undefined ?
      analytica.dogovoraByDay[res.day] = res.count :
      analytica.dogovoraByDay[res.day] = parseInt(analytica.dogovoraByDay[res.day], 10) + parseInt(res.count)

    })

    Object.keys(analytica.zavedenieByDay).map(day => {
      analytica.conversionDogovorByDay.data[day] = analytica.dogovoraByDay[day] !== undefined ? Math.round(analytica.dogovoraByDay[day] / analytica.zavedenieByDay[day] * 100) : 0
    })

    //////

    ////// общие суммы договоров помесячно

    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m')  as month, SUM(c_22) as sum FROM tickets_19
      WHERE c_19!=194 &&   c_23!="0000-00-00 00:00:00" && _active!=0 &&  date_format(_ts_create, '%Y-%m') >= date_format('${stdate}', '%Y-%m')  && date_format(_ts_create, '%Y-%m') <= date_format('${fndate}', '%Y-%m')
     GROUP BY date_format(_ts_create,'%Y-%m')`
    )

    result.map(res => {
      analytica.sumDogovorByMonth.data[res.month] = res.sum / 1000000
    })

    //архив 1
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m')  as month, SUM(c_22) as sum FROM tickets_19_arhiv
      WHERE c_19!=194 &&   c_23!="0000-00-00 00:00:00" && _active!=0 &&  date_format(_ts_create, '%Y-%m') >= date_format('${stdate}', '%Y-%m')  && date_format(_ts_create, '%Y-%m') <= date_format('${fndate}', '%Y-%m')
     GROUP BY date_format(_ts_create,'%Y-%m')`
    )

    result.map(res => {
      analytica.sumDogovorByMonth.data[res.month] === undefined ?
      analytica.sumDogovorByMonth.data[res.month] = res.sum / 1000000 :
      analytica.sumDogovorByMonth.data[res.month] = analytica.sumDogovorByMonth.data[res.month] + (res.sum / 1000000)
    })

    //архив 2
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m')  as month, SUM(c_22) as sum FROM tickets_19_archiv_ok
      WHERE c_19!=194 &&   c_23!="0000-00-00 00:00:00" && _active!=0 &&  date_format(_ts_create, '%Y-%m') >= date_format('${stdate}', '%Y-%m')  && date_format(_ts_create, '%Y-%m') <= date_format('${fndate}', '%Y-%m')
     GROUP BY date_format(_ts_create,'%Y-%m')`
    )

    result.map(res => {
      analytica.sumDogovorByMonth.data[res.month] === undefined ?
      analytica.sumDogovorByMonth.data[res.month] = res.sum / 1000000 :
      analytica.sumDogovorByMonth.data[res.month] = analytica.sumDogovorByMonth.data[res.month] + (res.sum / 1000000)
    })


    ////// средний чек договоров помесячно

    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m')  as month, AVG(c_22) as sum FROM tickets_19
      WHERE c_19!=194 &&   c_23!="0000-00-00 00:00:00" && _active!=0 &&  date_format(_ts_create, '%Y-%m') >= date_format('${stdate}', '%Y-%m')  && date_format(_ts_create, '%Y-%m') <= date_format('${fndate}', '%Y-%m')
     GROUP BY date_format(_ts_create,'%Y-%m')`
    )

    result.map(res => {
      analytica.avgSumDogovorByMonth.data[res.month] = res.sum / 1000
    })

    //архив 1
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m')  as month, AVG(c_22) as sum FROM tickets_19_arhiv
      WHERE c_19!=194 &&   c_23!="0000-00-00 00:00:00" && _active!=0 &&  date_format(_ts_create, '%Y-%m') >= date_format('${stdate}', '%Y-%m')  && date_format(_ts_create, '%Y-%m') <= date_format('${fndate}', '%Y-%m')
     GROUP BY date_format(_ts_create,'%Y-%m')`
    )

    result.map(res => {
      analytica.avgSumDogovorByMonth.data[res.month] === undefined ?
      analytica.avgSumDogovorByMonth.data[res.month] = res.sum / 1000 :
      analytica.avgSumDogovorByMonth.data[res.month] = analytica.avgSumDogovorByMonth.data[res.month] + (res.sum / 1000)
    })

    //архив 2
    result = await pool.query(
    `SELECT date_format(_ts_create,'%Y-%m')  as month, AVG(c_22) as sum FROM tickets_19_archiv_ok
      WHERE c_19!=194 &&   c_23!="0000-00-00 00:00:00" && _active!=0 &&  date_format(_ts_create, '%Y-%m') >= date_format('${stdate}', '%Y-%m')  && date_format(_ts_create, '%Y-%m') <= date_format('${fndate}', '%Y-%m')
     GROUP BY date_format(_ts_create,'%Y-%m')`
    )

    result.map(res => {
      analytica.avgSumDogovorByMonth.data[res.month] === undefined ?
      analytica.avgSumDogovorByMonth.data[res.month] = res.sum / 1000 :
      analytica.avgSumDogovorByMonth.data[res.month] = analytica.avgSumDogovorByMonth.data[res.month] + (res.sum / 1000)
    })


    /// Распределение по ичточникам заказов (взятых)

    result = await pool.query(
    `SELECT c_11 as istochnik, c_61 as isSite, COUNT(*) as count FROM tickets_19
      WHERE c_19!=194 &&   mark!=2 && (_fromid IS NULL) &&  date_format(_ts_create, '%Y-%m-%d') >= date_format('${stdate}', '%Y-%m-%d')  && date_format(_ts_create, '%Y-%m-%d') <= date_format('${fndate}', '%Y-%m-%d')
     GROUP BY c_11, c_61`
    )

    result.filter(res => res.isSite === null &&  res.istochnik === 1).map(res => {
      analytica.istochnikiByPeriod.data['Звонки'] = res.count
    })
    result.filter(res => res.isSite === '1' ).map(res => {
      analytica.istochnikiByPeriod.data['Почта'] = res.count
    })
    let drugoe = 0;
    result.filter(res => res.isSite === null && res.istochnik !== 1 ).map(res => {
      drugoe += res.count
    })
    analytica.istochnikiByPeriod.data['Другое'] = drugoe


    /// количество обращений помесячно
     _.sortedUniq(Object.keys(analytica.zavedenieByDay).map( date => moment(date,"YYYY-MM-DD").format('YYYY-MM'))).map((month) => {
       analytica.zavedenieByMonth.data[month] = 0
       Object.keys(analytica.zavedenieByDay).map((day) => {
         if (month === moment(day,"YYYY-MM-DD").format('YYYY-MM')) analytica.zavedenieByMonth.data[month] += analytica.zavedenieByDay[day]
       })
     })

     //////////Выполним сортировку по датам
     analytica.sumDogovorByMonth.data = dateOrder(analytica.sumDogovorByMonth.data);
     analytica.zavedenieByMonth.data = dateOrder(analytica.zavedenieByMonth.data);
     analytica.avgSumDogovorByMonth.data = dateOrder(analytica.avgSumDogovorByMonth.data);
//////////////////
    return ( { 'director': analytica });

  }

  return DirectorAnalytic;

}
