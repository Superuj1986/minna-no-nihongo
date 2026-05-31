import { useState, useEffect } from "react";
import Kanji from "./pages/Kanji.jsx";
import Vocab from "./pages/Vocab.jsx";

const PAGES = [
  { key: "home", label: "Trang chủ", subtitle: "Giới thiệu và điều hướng", icon: "🏠" },
  { key: "kanji", label: "Kanji", subtitle: "Ôn tập chữ Hán N5", icon: "漢字" },
  { key: "vocab", label: "Từ vựng", subtitle: "Ôn luyện từ vựng Minna", icon: "単語" },
];

function App() {
  const [active, setActive] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const selected = PAGES.find((item) => item.key === active);

  useEffect(() => {
    const update = () => setSidebarOpen(window.innerWidth > 960);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="app-shell" style={{ minHeight: "100vh", background: "#0e1523", color: "#f8fafc" }}>
      <aside
        className={`app-sidebar ${sidebarOpen ? "open" : "closed"}`}
        style={{
          background: "#111827",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Minna no Nihongo</div>
          <div style={{ fontSize: 13, color: "#9ca3af" }}>Học Kanji và từ vựng N5</div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {PAGES.map((page) => (
            <button
              key={page.key}
              onClick={() => setActive(page.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "14px 16px",
                borderRadius: 16,
                border: active === page.key ? "1px solid #2563eb" : "1px solid transparent",
                background: active === page.key ? "#1f2937" : "rgba(148,163,184,0.08)",
                color: active === page.key ? "#fff" : "#e5e7eb",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ fontSize: 18 }}>{page.icon}</span>
              <span>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{page.label}</div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>{page.subtitle}</div>
              </span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: "auto", fontSize: 12, color: "#6b7280" }}>
          <div style={{ marginBottom: 8, fontWeight: 700 }}>Tips</div>
          Chọn "Kanji" để làm bài kiểm tra chữ Hán hoặc "Từ vựng" để ôn từ mới.
        </div>
      </aside>

      <div className={sidebarOpen ? "sidebar-backdrop visible" : "sidebar-backdrop"} onClick={() => setSidebarOpen(false)} />
      <main className="app-main" style={{ flex: 1, padding: 28, boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div className="app-topbar">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen((open) => !open)}>
              {sidebarOpen ? "✕ Đóng menu" : "☰ Mở menu"}
            </button>
            <div>
              <p style={{ color: "#60a5fa", fontWeight: 700, marginBottom: 8 }}>Trang điều hướng</p>
              <h1 style={{ fontSize: 26, margin: 0 }}>{selected?.label || "Trang chủ"}</h1>
            </div>
          </div>
          <header style={{ marginBottom: 24 }}>
            <div className="app-header">
              <div>
                <p style={{ color: "#cbd5e1", marginTop: 10, maxWidth: 600 }}>
                  {active === "home"
                    ? "Chào mừng đến với Minna no Nihongo. Chọn một trang bên trái để bắt đầu học Kanji hoặc từ vựng."
                    : active === "kanji"
                    ? "Ôn tập Kanji N5 với nhiều bài học và câu hỏi kiểm tra."
                    : "Ôn luyện từ vựng Minna no Nihongo theo các bài học gốc."}
                </p>
              </div>
              {active === "home" && (
                <div style={{ minWidth: 220, padding: 18, borderRadius: 20, background: "#111827", border: "1px solid #1f2937" }}>
                  <div style={{ fontSize: 12, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>
                    Bắt đầu nhanh
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.6, color: "#e2e8f0" }}>
                    Trang chủ mới này giúp bạn điều hướng nhanh giữa các bài học, đồng thời tạo ra một trải nghiệm ứng dụng rõ ràng hơn.
                  </div>
                </div>
              )}
            </div>
          </header>

          <section style={{ minHeight: "70vh" }}>
            {active === "home" ? (
              <div className="app-home-panel">
                <div style={{ padding: 24, borderRadius: 24, background: "#111827", border: "1px solid #1f2937" }}>
                  <h2 style={{ fontSize: 22, marginBottom: 10 }}>Chào mừng</h2>
                  <p style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
                    Đây là trang tổng quan của ứng dụng học tiếng Nhật. Bạn có thể chuyển sang trang Kanji để luyện chữ Hán hoặc sang trang Từ vựng để ôn các từ vựng quan trọng.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                  <div style={{ padding: 20, borderRadius: 24, background: "#111827", border: "1px solid #1f2937" }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>📘</div>
                    <h3 style={{ margin: "0 0 10px" }}>Kanji</h3>
                    <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>Học Kanji theo bài. Thực hành qua câu hỏi và ôn tập.</p>
                  </div>
                  <div style={{ padding: 20, borderRadius: 24, background: "#111827", border: "1px solid #1f2937" }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>📝</div>
                    <h3 style={{ margin: "0 0 10px" }}>Từ vựng</h3>
                    <p style={{ color: "#cbd5e1", lineHeight: 1.7 }}>Xem danh sách từ vựng và bắt đầu ôn tập theo từng bài.</p>
                  </div>
                </div>
              </div>
            ) : active === "kanji" ? (
              <Kanji />
            ) : (
              <Vocab />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export { Kanji, Vocab };
export default App;
