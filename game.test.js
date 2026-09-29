import { test } from "node:test";
import assert from "node:assert/strict";
import { isHit, speedFor, BASE_SPEED, MAX_SPEED } from "./game.js";

// 地面に立っているプレイヤー（右端は x=138、足元は y=250）
const player = { x: 90, y: 202, w: 48, h: 48 };

test("障害物と重なっていれば当たる", () => {
  assert.equal(isHit(player, { x: 100, y: 200, w: 30, h: 50 }), true);
});

test("障害物が離れていれば当たらない", () => {
  assert.equal(isHit(player, { x: 400, y: 200, w: 30, h: 50 }), false);
});

test("ジャンプして障害物より上にいれば当たらない", () => {
  const jumping = { ...player, y: 100 };
  assert.equal(isHit(jumping, { x: 100, y: 200, w: 30, h: 50 }), false);
});

test("端が6px以内で触れただけなら当たらない", () => {
  // プレイヤーの右端から4pxだけ重なる障害物
  assert.equal(isHit(player, { x: 134, y: 200, w: 30, h: 50 }), false);
});

test("スコア0では最初の速さ", () => {
  assert.equal(speedFor(0), BASE_SPEED);
});

test("スコア50ごとに速さが1上がる", () => {
  assert.equal(speedFor(49), BASE_SPEED);
  assert.equal(speedFor(50), BASE_SPEED + 1);
  assert.equal(speedFor(120), BASE_SPEED + 2);
});

test("どれだけスコアが高くても上限を超えない", () => {
  assert.equal(speedFor(100000), MAX_SPEED);
});
