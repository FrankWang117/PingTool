import { switchTab } from "./functional/switch-tab.js";
import { registerEvent } from './functional/register-event.js';

switchTab();
registerEvent();

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    sendResponse("我收到了你的来信");
    console.log("接收了来自 content.js的消息", req.info);
});
