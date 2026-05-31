const fs = require('fs');
const p = 'src/pages/Vocab.jsx';
let t = fs.readFileSync(p, 'utf8');
const oldPart = `  // Phần study, quiz, results... bạn có thể bổ sung từ file cũ nếu cần.
  // Hiện tại code cơ bản đã chạy được.

  return <div>Đang tải...</div>;
}
`;
const newPart = `  const lessonNumbers = Array.from({ length: 14 }, (_, i) => i + 1);
  const hasCards = filtered.length > 0;
  const currentCard = deck[cardIdx];
  const currentQuiz = quizDeck[quizIdx];
  const quizPct = quizDeck.length ? Math.round((score / quizDeck.length) * 100) : 0;
  const wrongAnswers = quizHistory.filter((item) => !item.correct);

  const selectAllLessons = () => setSelLessons(new Set(lessonNumbers));
  const clearLessons = () => setSelLessons(new Set());

  if (screen === "home") {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <div>
            <p style={styles.title}>Minna no Nihongo</p>
            <p style={styles.subtitle}>みんなの日本語 — Từ vựng Bài 1–14</p>
          </div>
        </div>

        <div style={styles.section}>
          <span style={styles.label}>Chọn bài học</span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
            <button onClick={selectAllLessons} style={{ flex: 1, minWidth: 120, padding: "12px 14px", borderRadius: 12, border: "1px solid #d1d5db", background: "#2563eb", color: "white", cursor: "pointer" }}>
              Chọn tất cả
            </button>
            <button onClick={clearLessons} style={{ flex: 1, minWidth: 120, padding: "12px 14px", borderRadius: 12, border: "1px solid #d1d5db", background: "#f3f4f6", color: "#111827", cursor: "pointer" }}>
              Bỏ chọn
            </button>
          </div>
          <div style={styles.lessonGrid}>
            {lessonNumbers.map((n) => (
              <button key={n} style={styles.lessonBtn(selLessons.has(n), n)} onClick={() => toggleLesson(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <span style={styles.label}>Hướng ôn</span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setDirection("jp")} style={{ padding: "8px 16px", borderRadius: 10, border: direction === "jp" ? "2px solid #2563eb" : "1px solid #d1d5db", background: direction === "jp" ? "#2563eb" : "#f8fafc", color: direction === "jp" ? "#fff" : "#111827", cursor: "pointer" }}>
              Nhật → Việt
            </button>
            <button onClick={() => setDirection("vn")} style={{ padding: "8px 16px", borderRadius: 10, border: direction === "vn" ? "2px solid #2563eb" : "1px solid #d1d5db", background: direction === "vn" ? "#2563eb" : "#f8fafc", color: direction === "vn" ? "#fff" : "#111827", cursor: "pointer" }}>
              Việt → Nhật
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          <button onClick={startStudy} style={{ flex: 1, minWidth: 160, padding: "14px", background: "#378ADD", color: "white", border: "none", borderRadius: 8, fontSize: 16, cursor: "pointer" }}>
            Ôn Flashcard
          </button>
          <button onClick={startQuiz} style={{ flex: 1, minWidth: 160, padding: "14px", background: "#D85A30", color: "white", border: "none", borderRadius: 8, fontSize: 16, cursor: "pointer" }}>
            Làm Quiz
          </button>
        </div>
      </div>
    );
  }

  if (screen === "study") {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <div>
            <p style={styles.title}>Ôn flashcard</p>
            <p style={styles.subtitle}>Bài đã chọn: {Array.from(selLessons).sort((a, b) => a - b).join(", ") || "Chưa chọn bài"}</p>
          </div>
        </div>

        {!hasCards ? (
          <div style={{ padding: 24, borderRadius: 18, background: "#fff7e6", color: "#92400e" }}>
            Chưa có từ vựng trong bài đã chọn. Vui lòng chọn lại bài.
          </div>
        ) : (
          <div style={{ padding: 26, borderRadius: 20, background: "#ffffff", boxShadow: "0 20px 40px rgba(15,23,42,0.08)", marginBottom: 18 }}>
            <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 18 }}>Flashcard {cardIdx + 1}/{deck.length}</div>
            <div style={{ minHeight: 120, display: "grid", placeItems: "center", padding: 30, borderRadius: 24, background: "#f8fafc", color: "#111827", fontSize: 44, fontWeight: 700, lineHeight: 1.1 }}>
              {currentCard ? (flipped ? (direction === "jp" ? currentCard.meaning : currentCard.jp) : (direction === "jp" ? currentCard.jp : currentCard.meaning)) : "Không có thẻ"}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <button onClick={prevCard} disabled={cardIdx === 0} style={{ flex: 1, minWidth: 120, padding: 14, borderRadius: 12, border: "1px solid #d1d5db", background: cardIdx === 0 ? "#f3f4f6" : "#2563eb", color: cardIdx === 0 ? "#9ca3af" : "#fff", cursor: cardIdx === 0 ? "not-allowed" : "pointer" }}>
                ← Trước
              </button>
              <button onClick={flipCard} style={{ flex: 1, minWidth: 120, padding: 14, borderRadius: 12, border: "1px solid #d1d5db", background: "#f59e0b", color: "#fff", cursor: "pointer" }}>
                {flipped ? "Hiện mặt trước" : "Lật thẻ"}
              </button>
              <button onClick={nextCard} disabled={cardIdx === deck.length - 1} style={{ flex: 1, minWidth: 120, padding: 14, borderRadius: 12, border: "1px solid #d1d5db", background: cardIdx === deck.length - 1 ? "#f3f4f6" : "#16a34a", color: cardIdx === deck.length - 1 ? "#9ca3af" : "#fff", cursor: cardIdx === deck.length - 1 ? "not-allowed" : "pointer" }}>
                Sau →
              </button>
            </div>
          </div>
        )}

        <button onClick={restart} style={{ marginTop: 24, padding: 14, borderRadius: 12, border: "none", background: "#1f2937", color: "#fff", width: "100%", cursor: "pointer" }}>
          Quay lại trang chính
        </button>
      </div>
    );
  }

  if (screen === "quiz") {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <div>
            <p style={styles.title}>Quiz từ vựng</p>
            <p style={styles.subtitle}>Chọn đáp án đúng</p>
          </div>
        </div>

        {!hasCards ? (
          <div style={{ padding: 24, borderRadius: 18, background: "#fff7e6", color: "#92400e" }}>
            Chưa có từ vựng trong bài đã chọn. Vui lòng chọn lại bài.
          </div>
        ) : (
          <div style={{ padding: 26, borderRadius: 20, background: "#ffffff", boxShadow: "0 20px 40px rgba(15,23,42,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontSize: 14, color: "#6b7280" }}>Câu hỏi {quizIdx + 1}/{quizDeck.length}</div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>{direction === "jp" ? "日本語 → Tiếng Việt" : "Tiếng Việt → 日本語"}</div>
            </div>

            <div style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 22 }}>
              {currentQuiz ? (direction === "jp" ? currentQuiz.jp : currentQuiz.meaning) : "Không có câu hỏi"}
            </div>

            {(options || []).map((opt) => {
              const disabled = selected !== null;
              const isActive = selected === opt.id;
              return (
                <button key={opt.id} onClick={() => !disabled && handleAnswer(opt)} style={{ width: "100%", textAlign: "left", padding: 14, borderRadius: 14, border: "1px solid #d1d5db", marginBottom: 10, background: disabled ? (isActive ? "#2563eb" : "#f3f4f6") : "#f8fafc", color: disabled ? (isActive ? "#fff" : "#111827") : "#111827", cursor: disabled ? "default" : "pointer" }} disabled={disabled}>
                  {direction === "jp" ? opt.meaning : opt.jp}
                </button>
              );
            })}

            {selected !== null && (
              <button onClick={nextQuiz} style={{ marginTop: 12, width: "100%", padding: 14, borderRadius: 14, border: "none", background: "#10b981", color: "#fff", cursor: "pointer" }}>
                {quizIdx + 1 >= quizDeck.length ? "Xem kết quả" : "Câu tiếp"}
              </button>
            )}
          </div>
        )}

        <button onClick={restart} style={{ marginTop: 24, padding: 14, borderRadius: 12, border: "none", background: "#1f2937", color: "#fff", width: "100%", cursor: "pointer" }}>
          Quay lại trang chính
        </button>
      </div>
    );
  }

  if (screen === "results") {
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <div>
            <p style={styles.title}>Kết quả quiz</p>
            <p style={styles.subtitle}>{score}/{quizDeck.length} đúng — {quizPct}%</p>
          </div>
        </div>

        <div style={{ padding: 26, borderRadius: 20, background: "#ffffff", boxShadow: "0 20px 40px rgba(15,23,42,0.08)", marginBottom: 18 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 14 }}>Bạn đã hoàn thành</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <div style={{ flex: 1, minWidth: 120, padding: 16, borderRadius: 16, background: "#e0f2fe" }}><strong>{score}</strong> đúng</div>
            <div style={{ flex: 1, minWidth: 120, padding: 16, borderRadius: 16, background: "#fef3c7" }}><strong>{quizDeck.length - score}</strong> sai</div>
            <div style={{ flex: 1, minWidth: 120, padding: 16, borderRadius: 16, background: "#dcfce7" }}><strong>{quizPct}%</strong></div>
          </div>
        </div>

        {wrongAnswers.length > 0 && (
          <div style={{ padding: 22, borderRadius: 20, background: "#f8fafc", marginBottom: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Những câu trả lời sai</div>
            {wrongAnswers.map((item) => (
              <div key={item.q.id} style={{ padding: 14, borderRadius: 14, background: "#f3f4f6", marginBottom: 10 }}>
                <div style={{ fontSize: 14, marginBottom: 6 }}><strong>Câu hỏi:</strong> {direction === "jp" ? item.q.jp : item.q.meaning}</div>
                <div style={{ fontSize: 13, color: "#374151" }}><strong>Bạn chọn:</strong> {direction === "jp" ? item.chosen.meaning : item.chosen.jp}</div>
                <div style={{ fontSize: 13, color: "#047857" }}><strong>Đáp án đúng:</strong> {direction === "jp" ? item.q.meaning : item.q.jp}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={startQuiz} style={{ flex: 1, minWidth: 160, padding: 14, borderRadius: 12, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer" }}>
            Làm lại quiz
          </button>
          <button onClick={restart} style={{ flex: 1, minWidth: 160, padding: 14, borderRadius: 12, border: "none", background: "#1f2937", color: "#fff", cursor: "pointer" }}>
            Quay lại trang chính
          </button>
        </div>
      </div>
    );
  }

  return <div style={styles.root}>Đang tải...</div>;
}
`;
if (!t.includes(oldPart)) {
  console.error('OLD PART NOT FOUND');
  process.exit(1);
}
fs.writeFileSync(p, t.replace(oldPart, newPart), 'utf8');
console.log('patched');
