export default function (time) {
        var time = time*1000
        var date = new Date(time);

        var month = date.getMonth() + 1 >= 10 ?
                date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        var day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
        var hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
        var minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
        return `${month}-${day} ${hour}:${minute}`;
}