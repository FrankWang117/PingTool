const countActionEle = document.querySelector(".item-count .action");
countActionEle.addEventListener("click", () => {
    sendToContent();
});

function sendToContent() {
    // popup ---> content
    chrome.tabs.query({ active: true }, (tag) => {
        chrome.tabs.sendMessage(
            tag[0].id,
            { type: "count", message: "let count" },
            {},
            (res) => {
                const resultText = createResultText(res);
                const countEle = document.querySelector(".item-count");
                countEle.insertAdjacentHTML("afterend", resultText);
            }
        );
    });
}
/**
 * same as html
 */
function createResultText(
    count = { feCount: NaN, beCount: NaN, totalCount: NaN }
) {
    const htmlText = `<div class="result">
        <div class="result-content d-flex">
            <p class="result-item">
                <span class="title">前端故事点</span><span class="count f-16 f-500 primary-color">${count.feCount}</span>
            </p>
            <p class="result-item">
                <span class="title">后端故事点</span><span class="count f-16 f-500 primary-color">${count.beCount}</span>
            </p>
        </div>
        <p class="total-item mt-2">
        <span class="title">全部故事点</span><span class="count f-16 f-500 primary-color">${count.totalCount}</span>
        </p>
    </div>`;
    return htmlText;
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    sendResponse("我收到了你的来信");
    console.log("接收了来自 content.js的消息", req.info);
});
