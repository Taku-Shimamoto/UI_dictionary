// ==================================================
// ヘッダーのテンプレート化
// ==================================================

customElements.define("site-header", class extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <h1><a href="index.html">UI Dictionary</a></h1>
                <div id="hamburger" class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav id="hamburger_nav">
                    <ul>
                        <li><a class="nav-link" href="#">ページの一番上に戻る</a></li>
                        <li><a class="nav-link" href="#feature">特徴</a></li>
                        <li><a class="nav-link" href="#code">ソースコードの一例</a></li>
                        <li><a class="nav-link" href="#html_code">HTML</a></li>
                        <li><a class="nav-link" href="#css_code">CSS</a></li>
                        <li><a class="nav-link" href="#js_code">JavaScript</a></li>
                        <li><a class="nav-link" href="#explanation">解説</a></li>
                    </ul>
                </nav>
            </header>
        `;
    }
});

// ==================================================
// フッターのテンプレート化
// ==================================================

customElements.define("site-footer", class extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                Copyright &copy; 2026 改善委員会 - <a href="index.html">ホームへ戻る</a> -
            </footer>
        `;
    }
});

// ==================================================
// ハンバーガーメニュー
// ==================================================

const hamburgerButton = document.getElementById("hamburger");
const navigationWindow = document.getElementById("hamburger_nav");
const navigationLinks = Array.from(document.getElementsByClassName("nav-link"));

// activeクラスの付け外し
hamburgerButton.addEventListener("click", toggleClassActive);
function toggleClassActive() {
    hamburgerButton.classList.toggle("active");
    navigationWindow.classList.toggle("active");
}

// リンクをクリックしたとき、activeクラスを消去
navigationLinks.forEach((link) => link.addEventListener("click", clearClassActive));
function clearClassActive() {
    hamburgerButton.classList.remove("active");
    navigationWindow.classList.remove("active");
}

// ==================================================
// ページトップボタン
// ==================================================

const pageTopButton = document.getElementById("page_top");
const BUTTON_APPEARANCE_HEIGHT = 300;

// トップスクロールボタンの表示/非表示
window.addEventListener("scroll", toggleTopScrollButton);
function toggleTopScrollButton() {
    pageTopButton.classList.toggle("is-visible", window.scrollY > BUTTON_APPEARANCE_HEIGHT);
}

// ==================================================
// コードのコピー
// ==================================================

const copyButtons = Array.from(document.getElementsByClassName("copy-button"));
const copyTexts = Array.from(document.getElementsByClassName("copy-text"));
const RETURN_MS = 3000;

// テキストのコピー
copyButtons.forEach((button, i) => button.addEventListener("click", () => copyText(i)));
function copyText(i) {
    copyButtons[i].value = "✓";
    copyButtons[i].disabled = true;
    navigator.clipboard.writeText(copyTexts[i].textContent);

    setTimeout(() => {
        copyButtons[i].value = "Copy";
        copyButtons[i].disabled = false;
    }, RETURN_MS);
}