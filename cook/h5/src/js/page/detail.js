define(['mui'], function(mui) {
    let Sdata = JSON.parse(localStorage.getItem('data'));
    let pull = document.querySelectorAll('.pull>section');
    let tab = document.querySelector('.tabs')
    let span = document.querySelectorAll('.tabs>span')
    let [a, b] = [
        [],
        []
    ]
    let index = 0;

    function init() {
        render(Sdata)
        bind();
    }

    function watchpull(data) {
        data.forEach(item => {
            if (!a.length) {
                a.push(item);
                return;
            }
            if (!b.length) {
                b.push(item)
                return
            }
            if (a.reduce((s, v) => { return s + v.H }) < b.reduce((s, v) => { return s + v.H })) {
                a.push(item)
            } else {
                b.push(item)
            }
        })
        return [a, b]
    }

    function bind() {
        tab.addEventListener('click', function(e) {
            var tar = e.target;
            if (tar.nodeName === "SPAN") {
                let key = tar.getAttribute('data-sort');
                span[index].className = '';
                tar.className = 'active';
                index = tar.id;
                [a, b] = [
                    [],
                    []
                ]
                pull.forEach(item => {
                    item.innerHTML = '';
                })
                if (!key) {
                    render(Sdata)
                } else {
                    let temp = JSON.parse(JSON.stringify(Sdata));
                    temp.sort(function(a, b) {
                        return b[key] - a[key]
                    })
                    render(temp)
                }
            }
        })

    }

    function render(wdata) {
        let data = watchpull(wdata)
        data.forEach((item, i) => {
            pull[i].innerHTML = item.map(function(val) {
                return ` <dl>
                <dt>
                    <dt><img src="img/${val.img}" alt="" style='width:${val.H}px'></dt>
                <h3>${val.name}</h3>
                <p><span>${val.scroe}分</span><span>${val.done}个人做过</span></p>
                </dt>
            </dl> `
            }).join('')
        })
    }
    init();
})