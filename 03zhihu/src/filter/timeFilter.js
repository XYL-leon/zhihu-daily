export default function (time) {

        // var dateString = '19930701';

        var dateString = time;
        var pattern = /(\d{4})(\d{2})(\d{2})/;
        var formatedDate = dateString.replace(pattern, '$1-$2-$3');

        // console.log(formatedDate);  // success

        var date = new Date(formatedDate);
        // console.log(date)
        // var year = date.getFullYear();
        var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        var day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
        var week = date.getDay();
        var arr = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        return `${month}月${day}日 ${arr[week]}`;
}