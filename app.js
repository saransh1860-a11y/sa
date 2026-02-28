const DAILY_AD_LIMIT = 20;
const POINTS_PER_AD = 10;

const rewards = [
  {
    id: "gp-10",
    name: "Google Play Code - $10",
    cost: 100,
    codes: ["GPLAY-10A4-Q9T6", "GPLAY-10M8-R2X1", "GPLAY-10N3-Y7W5"],
  },
  {
    id: "gp-25",
    name: "Google Play Code - $25",
    cost: 240,
    codes: ["GPLAY-25B7-H8P2", "GPLAY-25V5-C4Z9"],
  },
  {
    id: "gp-50",
    name: "Google Play Code - $50",
    cost: 470,
    codes: ["GPLAY-50K2-T1L9"],
  },
];

const state = {
  points: 0,
  adsWatched: 0,
  redeemed: 0,
  history: [],
};

const refs = {
  points: document.getElementById("pointsValue"),
  watched: document.getElementById("adsWatchedValue"),
  redeemed: document.getElementById("codesRedeemedValue"),
  watchBtn: document.getElementById("watchAdButton"),
  adStatus: document.getElementById("adStatus"),
  rewardList: document.getElementById("rewardList"),
  historyList: document.getElementById("historyList"),
  rewardTemplate: document.getElementById("rewardTemplate"),
};

function updateStats() {
  refs.points.textContent = state.points;
  refs.watched.textContent = state.adsWatched;
  refs.redeemed.textContent = state.redeemed;
  refs.watchBtn.disabled = state.adsWatched >= DAILY_AD_LIMIT;

  if (state.adsWatched >= DAILY_AD_LIMIT) {
    refs.adStatus.textContent = "Daily ad limit reached. Come back tomorrow.";
  }
}

function renderHistory() {
  refs.historyList.innerHTML = "";

  if (state.history.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No redemptions yet.";
    refs.historyList.append(empty);
    return;
  }

  state.history.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `${entry.time} — ${entry.name}: ${entry.code}`;
    refs.historyList.append(item);
  });
}

function redeemReward(reward) {
  if (state.points < reward.cost) {
    refs.adStatus.textContent = `Not enough points for ${reward.name}.`;
    return;
  }

  const code = reward.codes.shift();
  if (!code) {
    refs.adStatus.textContent = `${reward.name} is currently out of stock.`;
    renderRewards();
    return;
  }

  state.points -= reward.cost;
  state.redeemed += 1;
  state.history.unshift({
    name: reward.name,
    code,
    time: new Date().toLocaleString(),
  });

  refs.adStatus.textContent = `Redeemed ${reward.name}. Your code: ${code}`;
  updateStats();
  renderRewards();
  renderHistory();
}

function renderRewards() {
  refs.rewardList.innerHTML = "";

  rewards.forEach((reward) => {
    const fragment = refs.rewardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".reward-item");
    const name = fragment.querySelector(".reward-name");
    const cost = fragment.querySelector(".reward-cost");
    const button = fragment.querySelector(".redeem-btn");

    name.textContent = reward.name;
    cost.textContent = `${reward.cost} points • ${reward.codes.length} codes left`;

    button.disabled = state.points < reward.cost || reward.codes.length === 0;
    button.textContent = reward.codes.length > 0 ? "Redeem" : "Out of stock";
    button.addEventListener("click", () => redeemReward(reward));

    card.dataset.rewardId = reward.id;
    refs.rewardList.append(card);
  });
}

function simulateAdWatch() {
  if (state.adsWatched >= DAILY_AD_LIMIT) {
    refs.adStatus.textContent = "You've reached the ad cap for today.";
    return;
  }

  refs.watchBtn.disabled = true;
  refs.adStatus.textContent = "Watching ad…";

  window.setTimeout(() => {
    state.adsWatched += 1;
    state.points += POINTS_PER_AD;

    refs.adStatus.textContent = `Ad complete! +${POINTS_PER_AD} points earned.`;
    updateStats();
    renderRewards();
  }, 1500);
}

refs.watchBtn.addEventListener("click", simulateAdWatch);
updateStats();
renderRewards();
renderHistory();
