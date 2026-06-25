/ ========== speech-control.js ========== /
// Chức năng: nhận diện giọng nói và tự động tra từ

window.addEventListener("DOMContentLoaded", () => {
  const micBtn = document.getElementById("micBtn");
  const input = document.getElementById("userInput");

  if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
    micBtn.disabled = true;
    micBtn.title = "Trình duyệt không hỗ trợ nhận dạng giọng nói";
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "vi-VN"; // Nhận dạng tiếng Việt
  recognition.continuous = false; // Dừng sau mỗi lần nói
  recognition.interimResults = false;

  let listening = false;

  micBtn.addEventListener("click", () => {
    if (!listening) {
      recognition.start();
      listening = true;
      micBtn.textContent = "🛑"; // Biểu tượng dừng
      micBtn.title = "Đang nghe... bấm để dừng";
    } else {
      recognition.stop();
      listening = false;
      micBtn.textContent = "🎤";
      micBtn.title = "Bấm để nói";
    }
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    console.log("Bạn nói:", transcript);

    // Gán kết quả vào ô input và tự động gửi
    input.value = transcript;
    sendMessage();
  };

  recognition.onerror = (event) => {
    console.error("Lỗi nhận dạng:", event.error);
    listening = false;
    micBtn.textContent = "🎤";
    micBtn.title = "Bấm để nói lại";
  };

  recognition.onend = () => {
    listening = false;
    micBtn.textContent = "🎤";
    micBtn.title = "Bấm để nói";
  };
});