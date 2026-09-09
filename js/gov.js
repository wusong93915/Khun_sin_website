/* =========================================================
   gov.js - 鯤鯓市府官網動態邏輯（含手機版體驗加強）
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. 動態顯示今日日期（民國紀年風格）
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

    // 2. 擬真點閱數遞增動畫
    const counterElement = document.getElementById("visitor-counter");
    if (counterElement) {
        const targetCount = 142857;
        let currentCount = targetCount - 35;
        
        const timer = setInterval(() => {
            currentCount += 1;
            counterElement.textContent = currentCount.toLocaleString();
            if (currentCount >= targetCount) {
                clearInterval(timer);
            }
        }, 40);
    }

    // 3. 手機版跑馬燈點擊暫停/繼續（提升手機閱讀便利度）
    const marquee = document.querySelector(".gov-marquee");
    if (marquee) {
        marquee.addEventListener("click", function () {
            if (this.style.animationPlayState === "paused") {
                this.style.animationPlayState = "running";
            } else {
                this.style.animationPlayState = "paused";
            }
        });
    }
});