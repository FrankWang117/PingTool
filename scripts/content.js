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