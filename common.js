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

const pageTopButton = document.getElementById("page_top");
const BUTTON_APPEARANCE_HEIGHT = 300;

// トップスクロールボタンの表示/非表示
window.addEventListener("scroll", toggleTopScrollButton);
function toggleTopScrollButton() {
    pageTopButton.classList.toggle("is-visible", window.scrollY > BUTTON_APPEARANCE_HEIGHT);
}

const copyButtons = Array.from(document.getElementsByClassName("copy-button"));
const copyTexts = Array.from(document.getElementsByClassName("copy-text"));
const scheduleTime = 3000;
let timerId = null;

// テキストのコピー
copyButtons.forEach((button, i) => button.addEventListener("click", () => copyText(i)));
function copyText(i) {
    copyButtons[i].value = "コピーしました。";
    copyButtons[i].disabled = true;
    navigator.clipboard.writeText(copyTexts[i].textContent);

    timerId = setTimeout(() => {
        copyButtons[i].value = "コードをコピーする";
        copyButtons[i].disabled = false;
    }, scheduleTime);
}