// ==================================================
// index.htmlの表示用データ
// ファイル追加があった際はここを追記してください。
// ==================================================

const PAGE_DATA = [
    {
        id: "accordion",
        name: "アコーディオン",
        href: "accordion.html",
        category: ["クリック操作", "表示切替"],
    },
    {
        id: "badge",
        name: "購入バッジ",
        href: "badge.html",
        category: ["状態表示", "表示切替", "UX"],
    },
    {
        id: "button",
        name: "ボタン",
        href: "button.html",
        category: ["クリック操作"],
    },
    {
        id: "dropdownmenu",
        name: "ドロップダウンメニュー",
        href: "dropdownmenu.html",
        category: ["クリック操作", "表示切替"],
    },
    {
        id: "hamburger",
        name: "ハンバーガーメニュー",
        href: "hamburger.html",
        category: ["クリック操作", "表示切替"],
    },
    {
        id: "modal",
        name: "モーダルウィンドウ",
        href: "modal.html",
        category: ["クリック操作", "詳細表示"],
    },
    {
        id: "slider",
        name: "画像スライダー(ドット)",
        href: "slider.html",
        category: ["クリック操作", "自動", "表示切替"],
    },
    {
        id: "tab",
        name: "タブ",
        href: "tab.html",
        category: ["クリック操作", "表示切替"],
    },
    {
        id: "toast",
        name: "トースト通知",
        href: "toast.html",
        category: ["フィードバック"],
    },
    {
        id: "toggleswitch",
        name: "トグルスイッチ",
        href: "toggleswitch.html",
        category: ["クリック操作", "表示切替"],
    },
    {
        id: "topscroll",
        name: "トップスクロールボタン",
        href: "topscroll.html",
        category: ["クリック操作"],
    },
    {
        id: "validation",
        name: "リアルタイムバリデーション",
        href: "validation.html",
        category: ["フィードバック", "UX", "セキュリティ"],
    },
    // 以降、追加があるときはここに追記してください。
];

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
// トースト通知のテンプレート化
// ==================================================

customElements.define("toast-notice", class extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="toast_notice" class="toast-notice">
                ✓ コピーしました
            </div>
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
// コードのコピー + トースト通知
// ==================================================

const copyButtons = Array.from(document.getElementsByClassName("copy-button"));
const copyTexts = Array.from(document.getElementsByClassName("copy-text"));
const RETURN_MS = 3000;
const toastNotice = document.getElementById("toast_notice");
let toastTimerId = null;

// テキストのコピー
copyButtons.forEach((button, i) => button.addEventListener("click", () => copyText(i)));
function copyText(i) {
    if (toastTimerId) {
        clearTimeout(toastTimerId);
    }

    navigator.clipboard.writeText(copyTexts[i].textContent);
    copyButtons[i].value = "✓";
    copyButtons[i].disabled = true;

    setTimeout(() => {
        copyButtons[i].value = "Copy";
        copyButtons[i].disabled = false;
    }, RETURN_MS);

    toggleToastActive();
}

function toggleToastActive() {
    toastNotice.classList.add("active");
    toastTimerId = setTimeout(() => {
        toastNotice.classList.remove("active");
        toastTimerId = null;
    }, RETURN_MS);
}