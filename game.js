// ゲームのルールをまとめたモジュール。
// DOMやCanvasに触れないので、ブラウザからもNode.jsのテストからも読み込める。

export const VERSION = "v2";         // 画面に表示するバージョン
export const GROUND = 250;           // 地面のY座標
export const GRAVITY = 0.8;          // 1フレームごとに加える重力
export const JUMP_VELOCITY = -14.5;  // ジャンプの初速
export const BASE_SPEED = 6;         // 障害物が流れる最初の速さ
export const MAX_SPEED = 12;         // 障害物が流れる速さの上限

// プレイヤーと障害物が当たっているか。横は6px内側で判定して理不尽な当たりを減らす
export function isHit(player, obstacle) {
  return player.x + 6 < obstacle.x + obstacle.w
    && player.x + player.w - 6 > obstacle.x
    && player.y + player.h > obstacle.y;
}

// スコア50ごとに速さを1上げる。ただし上限を超えない（v2で追加）
export function speedFor(score) {
  return Math.min(BASE_SPEED + Math.floor(score / 50), MAX_SPEED);
}