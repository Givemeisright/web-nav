const $cards = $('.cards');
const $lastCards = $cards.find('.siteAdd');
const hashMapStorage = localStorage.getItem('hashMapStorage');
const objectHasMap = JSON.parse(hashMapStorage)
//将string类型hasMap变成对象，对应const stringHashMap = JSON.stringify(hasMap)
const hasMap = objectHasMap || [{
        logo: 'C',
        url: 'https://caniuse.com/'
    },
    {
        logo: 'D',
        url: 'https://developer.mozilla.org/zh-CN/docs/Web'
    },
    {
        logo: 'F',
        url: 'https://www.figma.com/'
    },
    {
        logo: 'G',
        url: 'https://github.com/'
    },
    {
        logo: 'I',
        url: 'https://www.iconfont.cn/'
    },

    {
        logo: 'R',
        url: 'https://reactjs.org/'
    },
    {
        logo: 'V',
        url: 'https://cn.vuejs.org/'
    }
]
const prune = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace('cn.', '')
        .replace(/\/.*/, '')
        .replace(/\..*/, '')
}
const render = () => {
    $cards.find('li:not(.siteAdd)').remove()
    hasMap.forEach((cards, index) => {
        const $li = $(`
            <li>
                <div class="siteCard">
                    <div class="siteLogo">${cards.logo}</div>
                    <div class="siteLink">${prune(cards.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-jian"></use>
                        </svg>
                    </div>
                </div>
            </li>`).insertBefore($lastCards);
        $li.on('click', () => {
            window.open(cards.url)
        })
        $li.on('click', '.close', (e) => {

            e.stopPropagation() //阻止冒泡
            hasMap.splice(index, 1)
            //从当前index开始删除1个，即删除本身
            render()
        })

    })
}
render()
$(".siteAdd").on('click', () => {
    let url = window.prompt('请输入新增卡片地址')

    if (url.indexOf('http') !== 0) {
        //不是以http开头
        url = 'https://' + url
    }
    hasMap.push({
        logo: prune(url)[0],
        url: url
    })

    $cards.find('li:not(.siteAdd)').remove()
    //选择除了最后一个li的所有l，即除去添加卡片
    render()
});
window.onbeforeunload = () => {
    const stringHashMap = JSON.stringify(hasMap)
    //将hasMap转变为String，对应const objectHasMap = JSON.parse(hashMapStorage)
    localStorage.setItem('hashMapStorage', stringHashMap)
    //保存hasMap到本地浏览器内存
}

$(document).on('keypress', (e) => {
    const {
        key
    } = e
    //当变量名与属性名相同，相当于const key = e.key
    for (let i = 0; i < hasMap.length; i++) {
        if (hasMap[i].logo.toLowerCase() === key) {
            window.open(hasMap[i].url)
        } else if (hasMap[i].logo.toUpperCase() === key) {
            window.open(hasMap[i].url)
        }
    }
    //输入logo字母自动跳转页面
})