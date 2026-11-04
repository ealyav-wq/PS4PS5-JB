document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pick");
  const autoCheckbox = document.getElementById("auto");
  const countDisplay = document.getElementById("count");
  const btn = form.querySelector("button[type='submit']");

  let delaySeconds = 10; // مدة زمنية مريحة (10 ثوانٍ) قبل بدء التشغيل التلقائي
  let timer = null;

  function startCountdown() {
    if (!autoCheckbox.checked) {
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
        form.requestSubmit ? form.requestSubmit() : form.submit();
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

  // بدء العد التنازلي عند فتح الصفحة
  startCountdown();

  // إلغاء العد التنازلي فور تفاعل المستخدم مع الصفحة
  autoCheckbox.addEventListener("change", (e) => {
    if (!e.target.checked) {
      stopCountdown();
    } else {
      startCountdown();
    }
  });

  // إلغاء التشغيل التلقائي إذا تحرك المستخدم بأسهم يد التحكم (D-Pad)
  document.addEventListener("keydown", stopCountdown);
  document.addEventListener("click", stopCountdown);
});
