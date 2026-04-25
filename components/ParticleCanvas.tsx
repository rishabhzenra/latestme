"use client";

import { useEffect, useRef } from "react";

const LINK_DIST = 200;
const MOUSE_LINK_DIST = 180;
const BASE_SPEED = 0.5;

function getCount() {
  if (typeof window === "undefined") return 95;
  const w = window.innerWidth;
  if (w < 480) return 25;
  if (w < 768) return 45;
  return 95;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

function buildNoiseTexture(w: number, h: number): HTMLCanvasElement {
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  if (!octx) return off;

  const img = octx.createImageData(w, h);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i]     = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 10; // very faint
  }
  octx.putImageData(img, 0, 0);
  return off;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let W = 0, H = 0;
    const particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let noiseTexture: HTMLCanvasElement | null = null;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      noiseTexture = buildNoiseTexture(W, H);
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < getCount(); i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = BASE_SPEED * (0.4 + Math.random());
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 0.6 + 0.3,
        });
      }
    }

    function tick() {
      // Background gradient
      const grad = ctx!.createRadialGradient(W * 0.35, H * 0.25, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.85);
      grad.addColorStop(0,   "#1e1e26");
      grad.addColorStop(0.5, "#111113");
      grad.addColorStop(1,   "#090909");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, W, H);

      // Noise overlay
      if (noiseTexture) {
        ctx!.drawImage(noiseTexture, 0, 0);
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)  { p.x = 0;  p.vx *= -1; }
        if (p.x > W)  { p.x = W;  p.vx *= -1; }
        if (p.y < 0)  { p.y = 0;  p.vy *= -1; }
        if (p.y > H)  { p.y = H;  p.vy *= -1; }
      }

      // Particle–particle lines
      ctx!.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            const a = (1 - d / LINK_DIST) * 0.7;
            ctx!.strokeStyle = `rgba(160,150,220,${a.toFixed(3)})`;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Mouse–particle lines
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MOUSE_LINK_DIST) {
            const a = (1 - d / MOUSE_LINK_DIST) * 0.85;
            ctx!.strokeStyle = `rgba(124,111,234,${a.toFixed(3)})`;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = Math.random() > 0.85 ? "rgba(124,111,234,0.9)" : "rgba(200,196,225,0.85)";
        ctx!.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    const onResize = () => { resize(); init(); };
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onMouseLeave = () => { mouse.active = false; };

    resize();
    init();
    tick();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, display: "block" }}
    />
  );
}
