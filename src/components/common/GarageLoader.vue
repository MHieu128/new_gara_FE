<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    compact?: boolean;
  }>(),
  {
    label: 'Đang tải dữ liệu garage...',
    compact: false,
  },
);
</script>

<template>
  <div :class="['garage-loader rounded-lg border border-slate-200 bg-white shadow-sm', compact ? 'p-4' : 'p-8']" role="status" aria-live="polite">
    <div class="mx-auto max-w-sm">
      <div class="garage-bay">
        <div class="light-beam light-beam-left"></div>
        <div class="light-beam light-beam-right"></div>
        <div class="car">
          <div class="car-roof"></div>
          <div class="car-body"></div>
          <div class="headlight headlight-left"></div>
          <div class="headlight headlight-right"></div>
          <div class="wheel wheel-left"></div>
          <div class="wheel wheel-right"></div>
        </div>
        <div class="road-line road-line-a"></div>
        <div class="road-line road-line-b"></div>
        <div class="road-line road-line-c"></div>
      </div>
      <p class="mt-4 text-center text-sm font-black uppercase tracking-wide text-ink">{{ label }}</p>
      <p class="mt-1 text-center text-xs font-semibold text-slate-500">Kiểm tra máy chủ, dữ liệu và đường truyền</p>
    </div>
  </div>
</template>

<style scoped>
.garage-bay {
  position: relative;
  height: 126px;
  overflow: hidden;
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(7, 21, 39, 0.98), rgba(17, 24, 39, 0.96)),
    radial-gradient(circle at 50% 18%, rgba(11, 94, 215, 0.5), transparent 36%);
}

.garage-bay::before {
  content: '';
  position: absolute;
  inset: 12px 18px auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.38), transparent);
}

.car {
  position: absolute;
  left: 50%;
  bottom: 28px;
  width: 164px;
  height: 58px;
  transform: translateX(-50%);
  animation: idle 1.55s ease-in-out infinite;
}

.car-body {
  position: absolute;
  inset: 23px 8px 8px;
  border-radius: 18px 22px 10px 10px;
  background: linear-gradient(180deg, #f8fafc, #cbd5e1 72%, #94a3b8);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.42);
}

.car-roof {
  position: absolute;
  left: 38px;
  top: 6px;
  width: 86px;
  height: 36px;
  border-radius: 38px 38px 4px 4px;
  background: linear-gradient(135deg, #e2e8f0 0%, #f8fafc 48%, #94a3b8 100%);
}

.car-roof::after {
  content: '';
  position: absolute;
  inset: 8px 15px 9px;
  border-radius: 24px 24px 3px 3px;
  background: linear-gradient(135deg, rgba(11, 94, 215, 0.62), rgba(7, 21, 39, 0.88));
}

.wheel {
  position: absolute;
  bottom: 0;
  width: 28px;
  height: 28px;
  border: 5px solid #111827;
  border-radius: 999px;
  background: #64748b;
  box-shadow: inset 0 0 0 4px #cbd5e1;
  animation: spin 0.7s linear infinite;
}

.wheel-left {
  left: 28px;
}

.wheel-right {
  right: 28px;
}

.headlight {
  position: absolute;
  top: 36px;
  width: 18px;
  height: 8px;
  border-radius: 999px;
  background: #ffb020;
  box-shadow: 0 0 18px rgba(255, 176, 32, 0.9);
}

.headlight-left {
  left: 9px;
}

.headlight-right {
  right: 9px;
}

.light-beam {
  position: absolute;
  bottom: 38px;
  width: 72px;
  height: 18px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 176, 32, 0.55), transparent);
  filter: blur(4px);
  animation: beam 1.1s ease-in-out infinite;
}

.light-beam-left {
  left: 22px;
}

.light-beam-right {
  right: 22px;
  transform: scaleX(-1);
}

.road-line {
  position: absolute;
  bottom: 15px;
  width: 54px;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  animation: road 1.15s linear infinite;
}

.road-line-a {
  left: -64px;
}

.road-line-b {
  left: 42%;
  animation-delay: -0.38s;
}

.road-line-c {
  right: -30px;
  animation-delay: -0.76s;
}

@keyframes idle {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(2px);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes beam {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

@keyframes road {
  from {
    transform: translateX(-80px);
  }
  to {
    transform: translateX(300px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .car,
  .wheel,
  .light-beam,
  .road-line {
    animation: none;
  }
}
</style>
