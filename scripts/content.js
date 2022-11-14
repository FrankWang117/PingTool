const body = document.querySelector("body");
let noticeElement;// Element;
let navContainer;// Element; 
let observer = new MutationObserver(callback);

function callback(mutationRecords) {
    const record = mutationRecords[0]?.target;
    noticeElement = record?.querySelector(".app-root-header-actions .notice-badge");
    navContainer = record?.querySelector(".nav-body");

    if (record && noticeElement && navContainer) {
        observer.disconnect();
        updateNoticeStyles(noticeElement);
        resetPosition(navContainer, noticeElement);
    }
};


if (body) {
    const options = {
        'childList': true,
        'attributes': true
    };

    observer.observe(body, options);
}

// connect to popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const appName = document.querySelector(".title-name-text");
    const tableHeaderEl = document.querySelector(".styx-table-header table thead");
    const children = Array.from(tableHeaderEl.children);
    let feIndex, beIndex, totalIndex, feCount = 0, beCount = 0, totalCount = 0;
    for (let index = 0; index < children.length; index++) {
        const element = children[index];
        if (element.textContent === '前端故事点') {
            feIndex = index
        }
        if (element.textContent === '后端故事点') {
            beIndex = index
        }
        if (element.textContent === '故事点') {
            totalIndex = index
        }
    };
    const trList = document.querySelectorAll(".styx-table-body tbody tr")
    const trListArr = Array.from(trList);
    trListArr.forEach(tr => {
        const tdArr = Array.from(tr.children);
        const curFeNumber = Number(tdArr[feIndex].textContent);
        const curBeNumber = Number(tdArr[beIndex].textContent);
        const curTotalNumber = Number(tdArr[totalIndex].textContent);
        feCount += (isNaN(curFeNumber) ? 0 : curFeNumber);
        beCount += (isNaN(curBeNumber) ? 0 : curBeNumber);
        totalCount += (isNaN(curTotalNumber) ? 0 : curTotalNumber);
    })
    sendResponse({ feCount, beCount, totalCount, appName, feIndex, beIndex });
});


function updateNoticeStyles(element) {
    const noticeBell = element.querySelector('a.thy-action');
    setNoticeContainerStyles(element);
    setNoticeBellStyles(noticeBell);
}


function setNoticeContainerStyles(element) {
    element.classList.add('plugin-notice-container');
}

function setNoticeBellStyles(element) {
    element.classList.add('plugin-notice-bell');
}

function resetPosition(parentNode, targetNode) {
    const firstItem = parentNode.firstChild;
    parentNode.insertBefore(targetNode, firstItem);
}