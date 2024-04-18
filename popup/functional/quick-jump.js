import { clearAllChildren } from "./util.js";
const apps = ['workspace', 'ship', 'pjm', 'testhub', 'wiki', 'flow', 'insight', 'teams', 'plan', 'admin', 'workload', 'apps'];
const appsPattern = apps.join("|");
const urlPattern = new RegExp("https:\\/\\/(.*?)(?:\\.pingcode\\.com|\\.alpha\\.pingcode\\.live|\\.alpha\\.pingcode\\.local:\\d{1,6})\\/(?:" + appsPattern + ")");

export function quickJump() {
    console.log('quick jump is running ');
    chrome.tabs.query({ url: ['https://*.pingcode.com/*', '*://*.alpha.pingcode.live/*'] }, (tags) => {
        if (!tags || tags.length === 0) {
            const warningMessage = `没有 PingCode 智能研发管理工具 相关 Tab，点击<a href="https://pingcode.com/">查看、购买</a>`;
            const newEle = document.createElement("div");
            newEle.innerHTML = warningMessage;
            const containerEle = document.querySelector(".tab-list");
            clearAllChildren(containerEle);
            containerEle.appendChild(newEle);
        } else {
            const containerEle = document.querySelector(".tab-list");
            clearAllChildren(containerEle);
            tags.map(item => {
                return createTagItemEle(item)
            }).filter(item => item).forEach(item => containerEle.appendChild(item))

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

function createTagItemEle(tag) {
    const teamNameMatch = tag.url.match(urlPattern);
    if (!teamNameMatch) {
        return ''
    }
    const teamName = teamNameMatch[1];
    const tagTitle = tag.title || 'PingCode 智能研发管理工具';
    const active = tag.active;

    const item = document.createElement('li');
    item.classList.add('tab-item');
    if (active) {
        item.classList.add('active')
    } else {
        item.classList.remove('active');
    }
    item.dataset.tabIndex = tag.index;
    const content = `<div class="tab-icon">
              <img src="${tag.favIconUrl}" alt=${tagTitle}>
            </div>
            <div class="tab-info">
              <p class="tab-title text-truncate">${teamName}</p>
              <p class="tab-desc text-truncate">${tagTitle}</p>
            </div>`;
    item.innerHTML = content;
    return item;
};