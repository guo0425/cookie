define(['mui'], function(mui) {
    const sBox = document.querySelector('.sBox');
    let list = document.querySelector('.list');
    let top = document.querySelector('.top');
    let arrows = document.querySelector('.arrows')
    let search = document.querySelector('.btn')
    let hbox = document.querySelector('.history');
    let arr = null;

    function init() {
        mui.init();
        bind();
        renderHistory();
    }

    function bind() { //点击事件
        sBox.addEventListener('input', showList); //文本框改变时显示列表
        arrows.addEventListener('click', function() { //点击箭头是隐藏列表 和箭头
            show(0, "none", "none")
        })
        search.addEventListener('click', save) //本地存储 点击搜索按钮
    }

    function save() {
        let val = sBox.value.trim();
        //取出数据 
        let result = localStorage.getItem('history');
        //判断有没有
        if (result) {
            arr = JSON.parse(result)
                // hbox.innerHTML
        } else { //没有就添加
            arr = [];
        }
        //判断val存在不存在arr中
        if (!arr.includes(val)) {
            arr.push(val);
            localStorage.setItem('history', JSON.stringify(arr));
            renderHistory()
            location.href = 'detail.html'
        }
    }

    function renderHistory() {
        const result = localStorage.getItem('history');
        if (result) {
            hbox.innerHTML = JSON.parse(result).map(item => {
                return ` <span>${item}</span>`
            }).join('')
        }
    }

    function showList() { //显示列表
        let val = this.value.trim();
        if (val) {
            list.style.display = 'block';
            mui.ajax('/getdata', { //从后台获取数据
                data: {
                    kw: val
                },
                success(rs) {
                    if (rs.code === 1) {
                        renderList(rs.data)
                        localStorage.setItem('data', JSON.stringify(rs.data))
                    }
                }
            })
        }
    }

    function renderList(data) { //渲染
        list.innerHTML = data.map(function(item) {
            return `<li>${item.name}</li>`
        }).join('')
        if (!data.length) { //判断有没有数据  有就显示没有就隐藏
            show(0, 'none', 'none')
        } else {
            show('20px', 'block', 'block')
        }

        list.addEventListener('click', function(e) { //点击列表 的li添加到文本框内
            var tar = e.target
            if (tar.nodeName === 'LI') {
                sBox.value = tar.innerHTML;
                show(0, 'none', 'none')
            }

        })
    }

    function show(n, s, b) { //显示隐藏
        top.style.marginTop = n;
        arrows.style.display = s;
        list.style.display = b;
    }
    init()
});