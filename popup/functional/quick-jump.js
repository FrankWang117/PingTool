import { clearAllChildren } from "./util.js";

const apps = ['workspace', 'ship', 'pjm', 'testhub', 'wiki', 'flow', 'insight', 'teams', 'plan', 'admin', 'access', 'workload', 'apps'];
const appsPattern = apps.join("|");
const urlPattern = new RegExp("https:\\/\\/(.*?)(?:\\.pingcode\\.com|\\.alpha\\.pingcode\\.live|\\.alpha\\.pingcode\\.local:\\d{1,6})\\/(?:" + appsPattern + ")");

export const tabsContainerClsName = ".tabs-container";

export function quickJump() {
    chrome.tabs.query({ url: ['https://*.pingcode.com/*', '*://*.alpha.pingcode.live/*'] }, (tabs) => {
        const tabsResult = (!Array.isArray(tabs) ? [] : tabs).map(item => {
            return createTagItemEle(item)
        }).filter(item => item);
        if (!tabsResult || tabsResult.length === 0) {
            const warningMessage = `没有 PingCode 智能研发管理工具 相关 Tab，点击<a target="_blank" href="https://pingcode.com/">查看、购买</a>`;
            const newEle = document.createElement("p");
            newEle.classList.add("info");
            newEle.innerHTML = warningMessage;
            const containerEle = document.querySelector(tabsContainerClsName);
            clearAllChildren(containerEle);
            containerEle.appendChild(newEle);
        } else {
            const containerEle = document.querySelector(tabsContainerClsName);
            clearAllChildren(containerEle);
            // const tabsResult = tabs.map(item => {
            //     return createTagItemEle(item)
            // }).filter(item => item);
            tabsResult.forEach(item => containerEle.appendChild(item));
            const tabsResultLength = tabsResult.length <= 3 ? tabsResult.length : 3
            const gridContainer = document.querySelector(tabsContainerClsName);

            gridContainer.style.gridTemplateColumns = 'repeat(' + tabsResultLength + ', minmax(calc((100% - 16px) / ' + tabsResultLength + '), 1fr))';
        }
        // TODO 使用 promise 重构
        // const promise = chrome.tabs.sendMessage(tag[0].id, { type: "count", message: "let count" })
        // promise.then((res) => {
        //     if (response !== undefined) {
        //         const resultText = createResultText(res);
        //         const countEle = document.querySelector(".item-count");
        //         countEle.insertAdjacentHTML("afterend", resultText);
        //     }
        // }).catch(e => {
        // })
    });
}

/**
 * 
 * @param {*} tab 
 * @returns `<li class="card">
            <div class="card-icon">
              <img src="../images/32x32.png" alt="Icon 1">
            </div>
            <h2>Name 1</h2>
            <p>Description 1</p>
          </li>`
 */
function createTagItemEle(tab) {
    const teamNameMatch = tab.url.match(urlPattern);
    if (!teamNameMatch) {
        return;
    }
    const teamName = teamNameMatch[1];
    const tabTitle = tab.title || 'PingCode 智能研发管理工具';
    const active = tab.active;

    const item = document.createElement('li');
    item.classList.add('card');
    if (active) {
        item.classList.add('active')
    } else {
        item.classList.remove('active');
    }
    item.dataset.tabIndex = tab.index;
    const content = `<div class="card-icon">
              <img src="${tab.favIconUrl}" alt=${tabTitle}>
            </div>
            <div class="card-info">
              <h2 class="card-title text-truncate">${teamName}</h2>
              <p class="card-desc text-truncate">${tabTitle}</p>
            </div>`;
    item.innerHTML = content;
    return item;
};