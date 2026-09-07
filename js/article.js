/* =========================================================
   article.js - 文章頁專屬動態邏輯
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const articleBody = document.getElementById("article-body");
    
    if (!articleBody) return; // 確保只在文章頁執行

    // 1. 計算閱讀時間與字數
    const readTimeElement = document.getElementById("read-time");
    if (readTimeElement) {
        const text = articleBody.innerText.replace(/\s+/g, "");
        const wordCount = text.length;
        const wordsPerMinute = 350; // 平均閱讀速度
        const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
        
        readTimeElement.textContent = `閱讀時間約 ${readTime} 分鐘 (${wordCount} 字)`;
    }

    // 2. 自動生成文章目錄 (TOC)
    const headings = articleBody.querySelectorAll("h2");
    const summaryBlock = document.querySelector(".article-summary");

    if (headings.length > 0 && summaryBlock) {
        const tocBox = document.createElement("div");
        tocBox.className = "article-toc";
        tocBox.style.cssText = `
            margin-top: 1rem; padding-top: 0.8rem; border-top: 1px dashed var(--border-color, #ccc);
            font-size: 0.9rem;
        `;
        
        const tocTitle = document.createElement("strong");
        tocTitle.textContent = "【文章目錄】";
        tocTitle.style.display = "block";
        tocTitle.style.marginBottom = "0.4rem";
        
        const tocList = document.createElement("ul");
        tocList.style.cssText = "padding-left: 1.2rem; margin: 0; line-height: 1.6;";

        headings.forEach((heading, index) => {
            const headingId = `heading-${index}`;
            heading.id = headingId;

            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `#${headingId}`;
            link.textContent = heading.textContent;
            link.style.color = "var(--accent-brick, #881F0E)";
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocBox.appendChild(tocTitle);
        tocBox.appendChild(tocList);
        summaryBlock.appendChild(tocBox);
    }

    // 3. 閱讀進度條 (Scroll Progress Bar)
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 3px;
        background-color: var(--accent-brick, #881F0E); width: 0%;
        z-index: 101; transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", function () {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });
});