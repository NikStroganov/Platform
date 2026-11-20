"use client";

import { useEffect, useRef } from "react";

/** CareIT's damped spring; the existing card artwork stays fixed inside it. */
export function useCardTilt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let targetX = 0, targetY = 0, x = 0, y = 0, vx = 0, vy = 0, frame = 0;

    function tick() {
      if (!card) return;
      vx = (vx + (targetX - x) * .11) * .76;
      vy = (vy + (targetY - y) * .11) * .76;
      x += vx;
      y += vy;
      const moving = Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(vx) + Math.abs(vy) > .001;
      card.style.transform = moving || targetX || targetY ? `perspective(1100px) rotateX(${-y * 8}deg) rotateY(${x * 9}deg) translateZ(0)` : "";
      frame = moving ? requestAnimationFrame(tick) : 0;
    }
    function start() {
      if (!frame && !reduced.matches) frame = requestAnimationFrame(tick);
    }
    function move(event: PointerEvent) {
      if (event.pointerType === "touch" || reduced.matches || !card) return;
      const rect = card.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      start();
    }
    function reset() { targetX = targetY = 0; start(); }
    function keydown(event: KeyboardEvent) {
      if (reduced.matches || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      targetX = event.key === "ArrowLeft" ? -.7 : event.key === "ArrowRight" ? .7 : 0;
      targetY = event.key === "ArrowUp" ? -.7 : event.key === "ArrowDown" ? .7 : 0;
      start();
    }
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      targetX = targetY = x = y = vx = vy = 0;
      if (card) card.style.transform = "";
    }
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", reset);
    card.addEventListener("blur", reset);
    card.addEventListener("keydown", keydown);
    reduced.addEventListener("change", stop);
    return () => {
      stop();
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", reset);
      card.removeEventListener("blur", reset);
      card.removeEventListener("keydown", keydown);
      reduced.removeEventListener("change", stop);
    };
  }, []);

  return ref;
}
