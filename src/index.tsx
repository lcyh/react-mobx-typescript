import React from "react";
import ReactDom from "react-dom";
import "./index.less";

// 注册serviceWorker 
// 处理兼容性问题
console.log("service_test");
Promise.resolve(111);
if ("serviceWorker" in navigator) {
    console.log("service_worker");

    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => {
                console.log("加载serviceWorker成功");
            })
            .catch(() => {
                console.log("加载serviceWorker失败====");
            });
    });
}
/* 使用es6的箭头函数 */
const func1 = (str: string): void => {
    console.log(str);
    const ele: HTMLElement | null = document.getElementById("root");
    if (ele) {
        ele.innerHTML = str;
    }
};
func1("我现在在使用Babel!哈哈");
ReactDom.render(
    <div className="box">Hello React!===========</div>,
    document.getElementById("root")
);
