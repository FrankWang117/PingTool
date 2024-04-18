import { quickJump } from "./functional/quick-jump.js";
import { createCalcResult } from "./functional/calc-story-point.js";

const countActionEle = document.querySelector(".title-list .calc");
const refreshCalcEle = document.querySelector(".calc-refresh .action .icon");
// const switchActionEle = document.querySelector(".item-bell .checkbox-wrapper #toggle-read");
const jumpContainerEle = document.querySelector(".tab-list");

quickJump();

countActionEle.addEventListener("click", () => {
    createCalcResult();
});

refreshCalcEle.addEventListener("click", () => {
    refreshCalcEle.classList.add("rotate-center");
    createCalcResult();
});

// switchActionEle.addEventListener("click", () => {
//     const checked = switchActionEle.checked;
// });

jumpContainerEle.addEventListener("click", (e) => {
    let curTarget = e?.target;
    while (curTarget?.tagName !== 'LI' && curTarget) {
        curTarget = curTarget.parentNode;
    }
    if (!curTarget) {
        return;
    }
    const tabIndex = parseInt(curTarget.dataset.tabIndex);

    // 跳转 tab
    chrome.tabs.highlight({ tabs: tabIndex }, () => { });
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    sendResponse("我收到了你的来信");
    console.log("接收了来自 content.js的消息", req.info);
});
