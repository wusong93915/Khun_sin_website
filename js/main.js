/* =========================================================
   main.js - 全站通用動態邏輯
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. 平滑滾動 (Smooth Scroll)
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. 簡易 Lightbox 圖片預覽功能
    const articleImages = document.querySelectorAll(".article-media.media-image img, .project-map-img, #article-body img");

    if (articleImages.length > 0) {
    // 1. 建立 Lightbox 結構
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox-overlay";
    lightbox.className = "lightbox-overlay";

    const lightboxImg = document.createElement("img");
    lightboxImg.className = "lightbox-img";

    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    // 2. 點擊圖片開啟 Lightbox (漸現)
    articleImages.forEach(img => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", function () {
            lightboxImg.src = this.src;
            lightbox.classList.add("active");
        });
    });

    // 3. 點擊背景關閉 Lightbox (漸隱)
    lightbox.addEventListener("click", function () {
        lightbox.classList.remove("active");
    });
    }
    
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

});

// 在 JavaScript 中加入監聽邏輯 //

document.addEventListener("DOMContentLoaded", function () {
    const hero = document.querySelector(".hero");
    const heroImg = document.querySelector(".hero-img");
    const heroContent = document.querySelector(".hero-content");

    if (window.innerWidth > 768 &&hero && heroImg && heroContent) {
        
        hero.addEventListener("mousemove", function (e) {
            // 1. 取得 Hero 區塊的寬高與邊界位置
            const rect = hero.getBoundingClientRect();
            
            // 2. 計算滑鼠相對於 Hero 中心點的位置 (範圍約從 -0.5 到 0.5)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            // 3. 設定位移係數 (背景幅度小，前景文字反向且幅度大)
            const bgMoveX = x * 4;        // 背景水平移動最大 ±15px
            const bgMoveY = y * 3;        // 背景垂直移動最大 ±15px
            
            const contentMoveX = -x * 5;  // 前景反向移動最大 ∓30px
            const contentMoveY = -y * 6;  // 前景反向移動最大 ∓30px

            // 4. 透過 CSS transform 套用位移 (背景需保持 scale(1.1) 避免邊界露白)
            heroImg.style.transform = `scale(1.1) translate(${bgMoveX}px, ${bgMoveY}px)`;
            heroContent.style.transform = `translate(${contentMoveX}px, ${contentMoveY}px)`;
        });

        // 5. 當滑鼠離開 Hero 區塊時，漸變復原回中心位置
        hero.addEventListener("mouseleave", function () {
            heroImg.style.transform = "scale(1.1) translate(0px, 0px)";
            heroContent.style.transform = "translate(0px, 0px)";
        });
    }
});