import { clearAllChildren } from "./util.js";

export function createCalcResult() {
    // popup ---> content
    hiddenRefreshBtn();
    chrome.tabs.query({ active: true, url: 'https://*.pingcode.com/pjm/projects/*/sprint/*/list' }, (tabs) => {
        if (!tabs || tabs.length === 0) {
            const errorMessage = `Tab: 项目管理-迭代工作项列表 不在活跃状态中`;
            const errorEle = createErrorEle(errorMessage);
            updateResultContainer(errorEle);
            const newEle = document.createElement("button");
            newEle.innerHTML = errorMessage;
            newEle.classList.add("warning");
        } else {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { type: "count", message: "let count" },
                {},
                (res) => {
                    if (!res) {
                        const errorMessage = `请刷新页面后重试`;
                        const errorEle = createErrorEle(errorMessage);
                        updateResultContainer(errorEle);

                    } else {
                        const resultEle = createResultEle(res);
                        showRefreshBtn();

                        updateResultContainer(resultEle);
                    }
                });
        }

        // const promise = chrome.tabs.sendMessage(tag[0].id, { type: "count", message: "let count" })
        // promise.then((res) => {
        //     if (response !== undefined) {
        //         const resultText = createResultText(res);
        //         const countEle = document.querySelector(".item-count");
        //         countEle.insertAdjacentHTML("afterend", resultText);
        //     }
        // }).catch(e => {
        //     
        // })
    });

}

function updateResultContainer(element) {
    const countEle = document.querySelector(".calc-result-container");
    clearAllChildren(countEle);
    if (Array.isArray(element)) {
        element.forEach(item => {
            countEle.appendChild(item)
        })
    } else {
        countEle.appendChild(element);
    }
}

function createErrorEle(errorMessage = `Tab: 项目管理-迭代工作项列表 不在活跃状态中`) {
    const newEle = document.createElement("p");
    newEle.innerHTML = errorMessage;
    newEle.classList.add("warning");
    return newEle;
}

function createResultEle(
    count = { feCount: NaN, beCount: NaN, totalCount: NaN }
) {
    const infos = [
        {
            name: '前端故事点',
            count: count.feCount,
            icon: '../../images/frontend.svg'
        }, {
            name: '后端故事点',
            count: count.beCount,
            icon: '../../images/backend.svg'
        }, {
            name: '总故事点',
            count: count.totalCount,
            icon: '../../images/total.svg'
        },
    ];

    const resultContainerEle = document.createElement("ul");
    infos.forEach(info => {
        const item = document.createElement('li');
        item.classList.add('tab-item');

        const content = `<div class="tab-icon">
                 <img src="${info.icon}" alt=${info.name}>
               </div>
               <div class="tab-info d-flex tab-calc-info">
                 <p class="tab-title text-truncate">${info.name}</p>
                 <p class="tab-desc text-truncate">${info.count}</p>
               </div>`;
        item.innerHTML = content;
        resultContainerEle.appendChild(item);
    })
    return resultContainerEle;
}

function showRefreshBtn() {
    const btnEle = document.querySelector('.calc-refresh');
    btnEle.classList.remove('d-none');
}

function hiddenRefreshBtn() {
    const btnEle = document.querySelector('.calc-refresh');
    btnEle.classList.add('d-none');
    setTimeout(() => btnEle.querySelector('.action .icon').classList.remove("rotate-center"), 500);

}