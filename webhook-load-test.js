import http from "k6/http";
import { check } from "k6";
import crypto from "k6/crypto";

const WEBHOOK_SECRET = __ENV.WEBHOOK_SECRET;
const URL = "https://longgameacademy.com/api/webhooks/stripe";

export const options = {
  scenarios: {
    concurrent_checkouts: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "10s", target: 20 },
        { duration: "20s", target: 50 },
        { duration: "10s", target: 0 },
      ],
    },
  },
};

function signPayload(payload, secret) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload}`;
  const hmac = crypto.hmac("sha256", secret, signedPayload, "hex");
  return `t=${timestamp},v1=${hmac}`;
}

export default function () {
  const fakeUserId = `user_test_${__VU}_${__ITER}`;
  const sessionId = `cs_test_${__VU}_${__ITER}_${Date.now()}`;

  const payload = JSON.stringify({
    id: `evt_${sessionId}`,
    type: "checkout.session.completed",
    data: {
      object: {
        id: sessionId,
        client_reference_id: fakeUserId,
        amount_total: 9900,
        customer_details: { email: `${fakeUserId}@test.com` },
      },
    },
  });

  const signature = signPayload(payload, WEBHOOK_SECRET);

  const res = http.post(URL, payload, {
    headers: {
      "Content-Type": "application/json",
      "stripe-signature": signature,
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
