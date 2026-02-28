# PlayReward (Demo)

A lightweight prototype of a rewards app where users watch ads to earn points and redeem mock Google Play code rewards.

## Features

- Simulated ad watching with daily cap (20 ads/day)
- Points economy (+10 points per ad)
- Reward catalog with stock-aware redeem buttons
- Local redemption history log
- Responsive UI

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Important

This repository is a **demo/prototype only**:

- Ad completion and reward redemptions are simulated on the client.
- Codes in this demo are mock placeholders, not real gift cards.
- A real production app should use server-side validation, anti-fraud checks, secure inventories, and comply with Google Play and ad network policies.
