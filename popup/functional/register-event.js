import { quickJump, tabsContainerClsName } from "./quick-jump.js";
import { createCalcResult } from "./calc-story-point.js";

export function registerEvent() {
    // const countActionEle = document.querySelector(".title-list .calc");
    const countActionEle = document.querySelector('[data-tab-id="calc"]');
    const refreshCalcEle = document.querySelector(".calc-refresh .action .icon");
    // const switchActionEle = document.querySelector(".item-bell .checkbox-wrapper #toggle-read");
    const jumpContainerEle = document.querySelector(tabsContainerClsName);
    const settingEle = document.querySelector(".setting");
    const backEle = document.querySelector(".back");

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

    settingEle.addEventListener("click", () => {
        const mainContainerEle = document.querySelector('.main-container');
        const settingContainerEle = document.querySelector('.setting-container');
        mainContainerEle.classList.add('d-none');
        settingContainerEle.classList.remove('d-none');
    });

    backEle.addEventListener("click", () => {
        const mainContainerEle = document.querySelector('.main-container');
        const settingContainerEle = document.querySelector('.setting-container');
        mainContainerEle.classList.remove('d-none');
        settingContainerEle.classList.add('d-none');
    });
}
