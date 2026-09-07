/* =========================================================
   gov.js - 市府官網專屬動態邏輯
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. 動態顯示今日日期
    const dateContainer = document.getElementById("gov-current-date");
    if (dateContainer) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const date = String(now.getDate()).padStart(2, "0");
        const weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        const dayOfWeek = weekDays[now.getDay()];

        dateContainer.textContent = `中華民國 ${year - 1911} 年 ${month} 月 ${date} 日 ${dayOfWeek}`;
    }

    // 2. 動態顯示最新消息列表
    const newsListContainer = document.getElementById("gov-news-list"); 
});