//增
const div = dom.create("<div>newDiv</div>");
console.log(div);
dom.after(test,div);
const div3 = dom.create('<div id="parent"></div>');
dom.wrap(test, div3);
//删
const nodes = dom.empty(window.empty);
console.log(nodes);
//改
dom.attr(test,'title', 'hello');
const title = dom.attr(test, 'title');
console.log(`title: ${title}`);
dom.text(test, "你好");
dom.text(test);
dom.style(test, {border: '1px solid red', color: 'blue'});
console.log(dom.style(test, 'border'));
dom.style(test, 'border', '1px solid black');
dom.class.add(test, 'red');
dom.class.remove(test, 'red');
const fn = () => {
    console.log('点击了');
}
dom.on(test, 'click',fn)
dom.off(test, 'click',fn)
//查
const testDiv = dom.find('#test2')[0];
console.log(testDiv);
const test2 = dom.find('.red', test2)[0];
console.log(test2);
console.log(dom.parent(test));
console.log(dom.children(siblings));
const s2 = dom.find('#s2')[0];
console.log(dom.siblings(s2));
console.log(dom.next(s2));
console.log(dom.previous(s2));
const t = dom.find('#travel')[0];
dom.each(dom.children(t), (n)=> dom.style(n, 'color', 'red'));
console.log(dom.index(s2));
