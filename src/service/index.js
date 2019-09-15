/**
 * @desc [数据处理]
 */
import moment from 'moment';
import issueListJson from '../data/issueList.json';


const ERR_OK = 0;

export default {
  /**
   * 获取issueList列表
   * @returns { Array } issueList
   */
  getIssueList() {
    if (issueListJson.code === ERR_OK) {
      const data = issueListJson.data;
      data.map((res) => {
        console.log('res:', res);
        res.time = moment(res.updated_at).format('YYYY年M月');
        res.created_at =  moment(res.updated_at).format('YYYY年M月D日 HH:MM');
        const classify = res.updated_at.match('^[0-9]\\S{1,6}') ? res.updated_at.match('^[0-9]\\S{1,6}')[0] : '';
        res.belong = new Date(classify).getTime();
        res.updated_at = res.updated_at.match('^[0-9]\\S{1,9}') ? res.updated_at.match('^[0-9]\\S{1,9}')[0] : '';
        return res;
      });
      return data;
    }
    return [];
  }
}
