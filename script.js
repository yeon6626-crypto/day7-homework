/* ---------- To do list ---------- */
const goalInput = document.querySelector("#goalInput");
const addGoalBtn = document.querySelector("#addGoalBtn");
const goalList = document.querySelector("#goalList");
const errorMessage = document.querySelector("#errorMessage");
const goalCount = document.querySelector("#goalCount");

let goalTotal = 0;

function updateGoalCount() {
    goalCount.textContent = "현재 해야할 일: " + goalTotal + "개";
}

addGoalBtn.addEventListener("click", function () {
    const goalText = goalInput.value.trim();

    if (goalText === "") {
        errorMessage.textContent = "목표를 입력해주세요.";
        return;
    }

    errorMessage.textContent = "";

    const li = document.createElement("li");
    li.classList.add("goal-item");

    const span = document.createElement("span");
    span.textContent = goalText;
    span.classList.add("goal-text");

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(span);
    li.appendChild(deleteBtn);

    span.addEventListener("click", function () {
        span.classList.toggle("done");
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
        goalTotal -= 1;
        updateGoalCount();
    });

    goalList.appendChild(li);
    goalTotal += 1;
    updateGoalCount();
    goalInput.value = "";
});

updateGoalCount();

/* ---------- 방명록 ---------- */
(function () {
    /** @type {{ id: number, name: string, message: string, date: string }[]} */
    let entries = [
        {
            id: 1,
            name: "익명",
            message: "웹 기초 파이팅입니다!",
            date: "2024.05.10",
        },
        {
            id: 2,
            name: "응원자",
            message: "멋진 포트폴리오네요! 앞으로도 화이팅!",
            date: "2024.05.09",
        },
    ];

    const form = document.getElementById("guestbook-form");
    const nameInput = document.getElementById("guest-name");
    const messageInput = document.getElementById("guest-message");
    const submitBtn = document.getElementById("submit-btn");
    const entriesList = document.getElementById("entries-list");
    const entriesEmpty = document.getElementById("entries-empty");
    const entriesCount = document.getElementById("entries-count");

    if (!form || !nameInput || !messageInput || !submitBtn || !entriesList || !entriesEmpty || !entriesCount) {
        return;
    }

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function formatDateNow() {
        return new Date()
            .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\. /g, ".")
            .replace(".", "");
    }

    function updateSubmitDisabled() {
        const msg = messageInput.value;
        submitBtn.disabled = !msg || !msg.trim();
    }

    function render() {
        entriesCount.textContent = String(entries.length);

        if (entries.length === 0) {
            entriesEmpty.classList.remove("guestbook-hidden");
            entriesList.innerHTML = "";
            return;
        }

        entriesEmpty.classList.add("guestbook-hidden");
        entriesList.innerHTML = entries
            .map(function (entry, index) {
                const initial = escapeHtml(entry.name.charAt(0));
                const name = escapeHtml(entry.name);
                const date = escapeHtml(entry.date);
                const message = escapeHtml(entry.message);
                return (
                    '<article class="guestbook-entry" style="animation-delay: ' +
                    index * 100 +
                    'ms">' +
                    '<div class="guestbook-entry-inner">' +
                    '<div class="guestbook-entry-row">' +
                    '<div class="guestbook-avatar"><span>' +
                    initial +
                    "</span></div>" +
                    '<div class="guestbook-entry-body">' +
                    '<div class="guestbook-entry-meta">' +
                    '<span class="guestbook-entry-name">' +
                    name +
                    "</span>" +
                    '<span class="guestbook-entry-date">' +
                    date +
                    "</span>" +
                    "</div>" +
                    '<p class="guestbook-entry-message">' +
                    message +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</article>"
                );
            })
            .join("");
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const message = messageInput.value;
        if (!message || !message.trim()) return;

        const nameVal = nameInput.value;
        const newEntry = {
            id: Date.now(),
            name: nameVal && nameVal.trim() ? nameVal.trim() : "익명",
            message: message.trim(),
            date: formatDateNow(),
        };

        entries = [newEntry].concat(entries);
        nameInput.value = "";
        messageInput.value = "";
        updateSubmitDisabled();
        render();
    });

    messageInput.addEventListener("input", updateSubmitDisabled);

    render();
})();
