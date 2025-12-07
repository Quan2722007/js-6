let emoji = ["🐶", "🐱", "🐼", "🐸", "🦊", "🐵", "🐹", "🐰"];
const gameContainer = document.getElementById("game");
let cards = [...emoji, ...emoji]; //gấp đôi emoji

let firstCard = null;
let secondCard = null;
let score = 0;
let lock = false;

//Khởi tạo hàm thẻ
function installGame() {
    cardsData = cards.sort(() => Math.random() - 0.5); //random emoji
    cardsData.forEach((currentEmoji) => {
        //tạo các thẻ
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        //tạo thẻ với mặt ?
        const cardBack = document.createElement("div");
        cardBack.className = "card-back";
        cardBack.innerText = "❓";

        // tạo thẻ khi nhấp có hình emoji
        const cardFront = document.createElement("div");
        cardFront.className = "card-front";
        cardFront.innerText = currentEmoji;

        cardElement.appendChild(cardBack);
        cardElement.appendChild(cardFront);

        cardElement.onclick = () => flip(cardElement);
        cardElement.dataset.emoji = currentEmoji;

        gameContainer.appendChild(cardElement);
    });
}

// Kiểm tra hàm thẻ
function checkWin() {
    const totalParis = emoji.length;
    if (score === totalParis) {
        setTimeout(() => {
            alert(`You Win`);
            resetGame();
        }, 500);
    }
}

//Tọa hàm resetGame
function resetGame() {
    score = 0;
    let lock = false;

    // reset toàn bộ về ban đầu
    document.getElementById("score").innerText = score;
    gameContainer.innerHTML = "";

    installGame();
}

// Tạo hàm so sánh
function flip(clickedCard) {
    if (lock || clickedCard === firstCard || clickedCard.opened) return true;
    clickedCard.classList.add("flip");
    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        lock = true;

        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            firstCard.opened = secondCard.opened = true;
            score++;
            document.getElementById("score").innerText = score;
            checkWin();
            resetTurn();
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                resetTurn();
            }, 800);
        }
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lock = false;
}

installGame();
