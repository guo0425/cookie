define(['mui'], function(mui) {
    const sBox = document.querySelector('.sBox');
    let list = document.querySelector('.list');
    let top = document.querySelector('.top');
    let arrows = document.querySelector('.arrows')

    function init() {
        mui.init();
        bind();
    }

    function bind() { //点击事件
        sBox.addEventListener('input', showList); //文本框改变时显示列表
        arrows.addEventListener('click', function() { //点击箭头是隐藏列表 和箭头
            show(0, none, none)
        })
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
                    } else if (rs.code === 0) {

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

    function show(n, s, b) {
        top.style.marginTop = n;
        arrows.style.display = s;
        list.style.display = b;
    }
    init()
});