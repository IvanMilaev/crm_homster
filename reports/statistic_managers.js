const pool = require('../database');

module.exports = () => {
  const ManagersReport = {}

  ManagersReport.getReport = async (stdate, fndate) => {

    try {

      //формируем данные для grid
      const columns = [
        { name: 'userid', title: 'ID', type: 'id' },
        { name: 'fio', title: 'Менеджер', type: 'user'  },
        { name: 'zavedeno_zayavok', title: 'Звонки', type: 'count'},
        { name: 'sostoyav_zamer', title: 'Замеры', type: 'count'},
        { name: 'zvonok_zamer', title: 'Звонок-Замер', type: 'conversion'},
        { name: 'zayavki_site_mail', title: 'сайт почта', type: 'count'},
        { name: 'sostoyav_zamer_site_mail', title: 'Зам сайт почта', type: 'count'},
        { name: 'zayavka_site_mail_zamer', title: 'сайт-замер', type: 'conversion'},
        { name: 'zayavki_drugoy_istochnik', title: 'Др ист', type: 'count'},
        { name: 'sostoyav_zamer_drugoy_istochnik', title: 'Замеры с др ист', type: 'count'},
        { name: 'zayavki_drugoy_istochnik_zamer', title: 'Др ист-замер', type: 'conversion'},
        { name: 'zayavki_bezmontag', title: 'без монт', type: 'count'},
        { name: 'zayavki_bezmontag_dogovor', title: 'Закл без монт', type: 'conversion'},
        { name: 'vse_zayavki', title: 'Все', type: 'count'},
        { name: 'sostoyav_zamer_vse_zayavki', title: 'Замеры', type: 'count'},
        { name: 'vse_zayavki_zamer', title: 'Обращение-замер', type: 'conversion'},
      ];

      // Левая колонка - загружаем список менеджеров
      let result = await pool.query('SELECT _id,_f,_i,_o,_ident FROM _users WHERE  _account=24 && _id!=194 && _active=1');
      //собираем id шники пользователей
      const rowws = {}
      result.map((user) => { rowws[user._id]={
        userid: user._id ,
        fio:`${user._f} ${user._i} ${user._o} ${user._ident}`,
        zavedeno_zayavok: 0,
        sostoyav_zamer: 0,
        zvonok_zamer: 0,
        zayavki_site_mail: 0,
        sostoyav_zamer_site_mail: 0,
        zayavka_site_mail_zamer: 0,
        zayavki_drugoy_istochnik: 0,
        sostoyav_zamer_drugoy_istochnik: 0,
        zayavki_drugoy_istochnik_zamer: 0,
        zayavki_bezmontag: 0,
        zayavki_bezmontag_dogovor: 0,
        vse_zayavki: 0,
        sostoyav_zamer_vse_zayavki: 0,
        vse_zayavki_zamer: 0
      } });



      // узнаем количество заявок по прослушке у каждого менеджера
      //c_64 - маркер прослушки звонков в данном отчете можем избавиться

      /*
      result = await pool.query(
        `SELECT c_1 as userid, COUNT(*) as count FROM tickets_27
        WHERE (c_4=1||c_4=2||c_4=3)&&_active!=0&&(c_7=1||c_8>1)&&c_5!=3&&c_5!=4&&mark!=2
        && date_format(c_2,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(c_2,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_1
        `);

      result.map((resul) => { if(rowws[resul.userid] != undefined) {rowws[resul.userid]={ ...rowws[resul.userid], proslushka: resul.count }}  });
        //console.log(rowws);
        */

      //  заведенных заявок
      result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE (c_61 IS NULL)&&mark!=2
        && date_format(_ts_create,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(_ts_create,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );
      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], zavedeno_zayavok: resul.count }   });


      /*
      const zapisano_na_zamer = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE p_4_s!="0000-00-00 00:00:00" && (c_61 IS NULL) && mark!=2
        && date_format(p_4_s,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(p_4_s,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );
      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], zapisano_na_zamer: resul.count }   });
      */

      result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE p_4_s!="0000-00-00 00:00:00" && (c_61 IS NULL) && mark!=2 && c_39=1
        && date_format(p_4_s,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(p_4_s,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );

      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], sostoyav_zamer: resul.count }   });

      /*
      result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE c_40=1&&(c_61 IS NULL)&&_active!=0&&mark!=2
        && date_format(p_4_s,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(p_4_s,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );


      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], dogovora: resul.count  }   });
      */


      result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE c_61=1 && mark!=2
        && date_format(_ts_create,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(_ts_create,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );

      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], zayavki_site_mail: resul.count }   });



      result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE c_61=1 && p_4_s!="0000-00-00 00:00:00" && mark!=2 && c_39=1
        && date_format(p_4_s,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(p_4_s,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );

      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], sostoyav_zamer_site_mail: resul.count }   });



      result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE (c_61!=1||c_61 IS NULL) && (c_64!=1||c_64 IS NULL) && mark!=2 && (_fromid IS NULL)
        && date_format(_ts_create,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(_ts_create,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );

      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], zayavki_drugoy_istochnik: resul.count }   });




      result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE (c_61!=1||c_61 IS NULL) && (c_64!=1||c_64 IS NULL) && mark!=2 && (_fromid IS NULL) && p_4_s!="0000-00-00 00:00:00" && c_39=1
        && date_format(p_4_s,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(p_4_s,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );

      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], sostoyav_zamer_drugoy_istochnik: resul.count }   });



      /*result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE (c_61!=1||c_61 IS NULL) && (c_64!=1||c_64 IS NULL) && mark!=2 && (_fromid IS NULL) && p_4_s!="0000-00-00 00:00:00" && c_39=1
        && date_format(p_4_s,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(p_4_s,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );

      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], zayavki_bezmontag: resul.count }   });
      */

      /*result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE (c_61!=1||c_61 IS NULL) && (c_64!=1||c_64 IS NULL) && mark!=2 && (_fromid IS NULL) && p_4_s!="0000-00-00 00:00:00" && c_39=1
        && date_format(p_4_s,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(p_4_s,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );

      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], zayavki_bezmontag_dogovor: resul.count }   });
      */


      result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE mark!=2 && (_fromid IS NULL)
        && date_format(_ts_create,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(_ts_create,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );

      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], vse_zayavki: resul.count }   });



      result = await pool.query(
        `SELECT c_19 as userid, COUNT(*) as count FROM tickets_19
        WHERE mark!=2 && (_fromid IS NULL) && c_39=1 && p_4_s!="0000-00-00 00:00:00"
        && date_format(p_4_s,'%Y-%m-%d') >= date_format('${stdate}','%Y-%m-%d')
        && date_format(p_4_s,'%Y-%m-%d') <= date_format('${fndate}','%Y-%m-%d')
        GROUP BY c_19
        `
      );

      result.map((resul) => { if(rowws[resul.userid] != undefined) rowws[resul.userid]={ ...rowws[resul.userid], sostoyav_zamer_vse_zayavki: resul.count }   });



      Object.values(rowws).map((row) => {
         rowws[row.userid] = {
           ...rowws[row.userid],
           zvonok_zamer: row.zavedeno_zayavok > 0 ? Math.round(row.sostoyav_zamer/row.zavedeno_zayavok * 100) : 0,
           zayavka_site_mail_zamer: row.zayavki_site_mail > 0 ? Math.round(row.sostoyav_zamer_site_mail/row.zayavki_site_mail * 100) : 0,
           zayavki_drugoy_istochnik_zamer: row.zayavki_drugoy_istochnik > 0 ? Math.round(row.sostoyav_zamer_drugoy_istochnik/row.zayavki_drugoy_istochnik  * 100) : 0,
           vse_zayavki_zamer: row.vse_zayavki > 0 ? Math.round(row.sostoyav_zamer_vse_zayavki/row.vse_zayavki  * 100) : 0,
         }
       });


      const rows = Object.values(rowws);

      return ({reportName: 'statistic_managers' , columns, rows, stdate, fndate });

    } catch (err) {
      throw new Error(err)
    }

  }

  return ManagersReport;
}
