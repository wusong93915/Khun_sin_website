/* =========================================================
   article.js - 文章頁專屬動態邏輯（含手機版 TOC 優化）
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const articleBody = document.getElementById("article-body");
    if (!articleBody) return;

    // 1. 計算閱讀時間與字數
    const readTimeElement = document.getElementById("read-time");
    if (readTimeElement) {
        const text = articleBody.innerText.replace(/\s+/g, "");
        const wordCount = text.length;
        const wordsPerMinute = 350;
        const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
        readTimeElement.textContent = `閱讀時間約 ${readTime} 分鐘 (${wordCount} 字)`;
    }

    // 2. 自動生成文章目錄 (TOC)
    const headings = articleBody.querySelectorAll("h2");
    const summaryBlock = document.querySelector(".article-summary");

    if (headings.length > 0 && summaryBlock) {
        // 建立 TOC 主容器
        const tocBox = document.createElement("details"); // 使用 HTML5 details 實現手風琴效果
        tocBox.className = "article-toc";
        
        // 手機版預設摺疊，桌機版 (寬度 > 768px) 預設展開
        if (window.innerWidth > 768) {
            tocBox.open = true;
        }

        const tocSummary = document.createElement("summary");
        tocSummary.className = "toc-title";
        tocSummary.innerHTML = `<span>【文章目錄】</span><span class="toc-icon">↓</span>`;
        
        const tocList = document.createElement("ul");
        tocList.className = "toc-list";

        headings.forEach((heading, index) => {
            const headingId = `heading-${index}`;
            heading.id = headingId;

            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `#${headingId}`;
            link.textContent = heading.textContent;
            
            // 點擊目錄連結後，若在手機版則自動摺疊目錄
            link.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    tocBox.open = false;
                }
            });

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocBox.appendChild(tocSummary);
        tocBox.appendChild(tocList);
        summaryBlock.appendChild(tocBox);

        // 3. 手機版右下角「浮動目錄按鈕」
        const floatBtn = document.createElement("button");
        floatBtn.className = "toc-float-btn";
        floatBtn.innerHTML = `≡ 目錄`;
        floatBtn.setAttribute("aria-label", "開啟文章目錄");
        document.body.appendChild(floatBtn);

        // 滾動超過文章開頭時顯示浮動按鈕
        window.addEventListener("scroll", function () {
            const summaryRect = summaryBlock.getBoundingClientRect();
            if (summaryRect.bottom < 0 && window.innerWidth <= 768) {
                floatBtn.classList.add("visible");
            } else {
                floatBtn.classList.remove("visible");
            }
        });

        // 點擊浮動按鈕直接捲動至 TOC 區塊並展開
        floatBtn.addEventListener("click", function () {
            tocBox.open = true;
            tocBox.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    // 4. 閱讀進度條
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress-bar";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });
});