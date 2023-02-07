window.dom = {
    create(string) {//创建一个节点
        const container =  document.createElement("template");//template标签可以容纳所有标签
        container.innerHTML = string.trim();//trim()过滤掉空格
        return container.content.firstChild;//使用template标签就要用.content.firstChild方法
    },
    after(node, node2){//新增一个弟弟
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2){//新增一个哥哥
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node){//新增一个儿子
        parent.appendChild(node);
    },
    wrap(node, parent){//新增一个爸爸
        dom.before(node, parent);//先把parent放在node前面
        dom.append(parent, node);//再把node变成parent的儿子
    },
    remove(node){//删除节点
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node){
        const {childNodes} = node;//等价于const chileNodes = node.childNodes
        const array = [];
        let x = node.firstChild;
        while(x){
            array.push(dom.remove(node.firstChild));
            x = node.firstChild
        }
        //因childNodes.length时时改变，for循环不适用
        // for (let i = 0; i < childNodes.length; i++) {
        //     dom.remove(childNodes[i]);
        //     array.push(childNodes[i]);
        // }
        return array;
    },
    attr(node, name, value){//重载
        if(arguments.length === 3){
            //3个参数就是创建
            node.setAttribute(name,value);
        } else if(arguments.length === 2){
            //2个参数就是获取
            return node.getAttribute(name);
        }        
    },
    text(node, string){//适配
        if(arguments.length === 2){
            if('innerText' in node){
                node.innerText = string;//ie
            } else {
                node.textContent = string;//firefox / Chrome
            }
        } else if(arguments.length === 1){
            if('innerText' in node){
                return node.innerText
            } else {
                return node.textContent
            }
        }          
    },
    html(node, string){
        if(arguments.length === 2){
            node.innerHTML = string;
        } else if(arguments.length === 1){
            return node.innerHTML;
        }
    },
    style(node, name, value){
        if(arguments.length === 3){
            // dom.style(div, 'color', 'red')
            node.style[name] = value;
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                // dom.style(div, 'color')
                return node.style[name];
            } else if(name instanceof Object){
                // dom.style(test, {border: '1px solid red', color: 'blue'});
                const object = name;
                for (let key in object) {
                    node.style[key] = object[key];
                }
            }
        }
    },
    class: {
        add(node, className){
            node.classList.add(className);
        },
        remove(node, className){
            node.classList.remove(className);
        },
        has(node, className){
            return node.classList.contains(className);
        }
    },
    on(node, eventName, fn){
        node.addEventListener(eventName, fn);
    },
    off(node, eventName, fn){
        node.removeEventListener(eventName, fn);
    },
    find(selector, scope){
        return (scope || document).querySelectorAll(selector);
    },
    parent(node){
        return node.parentNode;
    },
    children(node){
        return node.children;
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter(n => n !== node);
    },
    next(node){
        let x = node.nextSibling;
        while(x && x.nodeType === 3){
            x = x.nextSibling;
        }
        return x;
    },
    previous(node){
        let x = node.previousSibling;
        while(x && x.nodeType === 3){
            x = x.previousSibling;
        }
        return x;
    },
    each(nodeList, fn){
        for(let i=0;i<nodeList.length;i++){
          fn.call(null, nodeList[i])
        }
    },
    index(node){
        const list = dom.children(node.parentNode);
        let i
        for(i=0;i<list.length;i++){
            if(list[i] === node)
            break;
        }
        return 1;
    }
};