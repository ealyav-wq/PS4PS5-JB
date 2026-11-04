document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pick");
  const autoCheckbox = document.getElementById("auto");
  const countDisplay = document.getElementById("count");

  let delaySeconds = 10; // مهلة 10 ثوانٍ
  let timer = null;

  function startCountdown() {
    if (!autoCheckbox || !autoCheckbox.checked) {
      if (countDisplay) countDisplay.textContent = "";
      return;
    }

    let remaining = delaySeconds;
    if (countDisplay) {
      countDisplay.textContent = `Auto-launching in ${remaining}s... (Press any button to cancel)`;
    }

    timer = setInterval(() => {
      remaining--;
      if (countDisplay) {
        countDisplay.textContent = `Auto-launching in ${remaining}s... (Press any button to cancel)`;
      }

      if (remaining <= 0) {
        clearInterval(timer);
        // توجيه المتصفح فور انتهاء العداد إلى مسار الفورم (jb.html)
        form.submit();
      }
    }, 1000);
  }

  function stopCountdown() {
    if (timer) {
      clearInterval(timer);
      timer = null;
      if (countDisplay) {
        countDisplay.textContent = "AUTO-START CANCELLED";
      }
    }
  }

  startCountdown();

  if (autoCheckbox) {
    autoCheckbox.addEventListener("change", (e) => {
      if (!e.target.checked) {
        stopCountdown();
      } else {
        startCountdown();
      }
    });
  }

  // إلغاء التشغيل التلقائي عند الضغط على أي زر في يد التحكم أو النقر
  document.addEventListener("keydown", stopCountdown);
  document.addEventListener("click", stopCountdown);
});
