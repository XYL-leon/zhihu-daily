var baseUrl='/api'

// 用户界面
var view =baseUrl+'/api/7/prefetch-launch-images/1080*1920'
// 最新消息
var news=baseUrl+'/api/4/news/latest'
// 过往消息
var PreviousNerws =baseUrl+'/api/4/news/before/'
// 消息内容获取与离线下载
var obtain =baseUrl+'/api/4/news/'
// 新闻对应长评论查看
var addNews =baseUrl+'/api/4/story'
// 新闻额外消息
var addmes = baseUrl+'/api/4/story-extra'
export default{
    view,
    news,
    PreviousNerws,
    obtain,
    addNews,
    addmes
}