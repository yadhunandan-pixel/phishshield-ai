import { useState } from "react";

export default function App() {
  const highlightText = (text, keywords) => {
  let highlighted = text;

  keywords.forEach(word => {
    const regex = new RegExp(`(${word})`, "gi");
    highlighted = highlighted.replace(
      regex,
      `<span class="text-red-400 font-semibold">$1</span>`
    );
  });

  // Highlight links too
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  highlighted = highlighted.replace(
    linkRegex,
    `<span class="text-yellow-400 underline">$1</span>`
  );

  return highlighted;
};
const generateExplanation = (score, reasons) => {
  if (score > 70) {
    return "This message shows strong indicators of a phishing attempt, including urgent language and potentially malicious links. Users should avoid interacting with such content.";
  } else if (score > 30) {
    return "This message contains some suspicious elements. While it may not be fully malicious, caution is advised before taking any action.";
  } else {
    return "This message appears safe with no strong phishing indicators detected. However, always remain cautious with unknown sources.";
  }
};
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeText = () => {
    const keywords = ["urgent", "verify", "otp", "click", "bank", "password"];
    let score = 0;
    let reasons = [];

    keywords.forEach(word => {
      if (text.toLowerCase().includes(word)) {
        score += 15;
        reasons.push(`Suspicious keyword: ${word}`);
      }
    });

    if (text.includes("http") || text.includes("www")) {
      score += 20;
      reasons.push("Contains external link");
    }

    let status = "Safe";
    if (score > 70) status = "Dangerous";
    else if (score > 30) status = "Suspicious";

    setResult({ score, status, reasons });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Detect <span className="text-pink-500">Phishing</span>  
            <br /> Before It Hits You
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            PhishShield AI analyzes suspicious messages in real-time and helps you identify scams before they cause damage.
          </p>

          <div className="flex gap-4">
            <span className="px-4 py-2 bg-white/10 rounded-lg text-sm">Real-time Detection</span>
            <span className="px-4 py-2 bg-white/10 rounded-lg text-sm">AI Insights</span>
            <span className="px-4 py-2 bg-white/10 rounded-lg text-sm">Secure</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 blur-2xl opacity-20 rounded-3xl"></div>

          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">

            <textarea
              placeholder="Paste suspicious message here..."
              className="w-full h-32 p-4 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={analyzeText}
              className="mt-5 w-full bg-gradient-to-r from-pink-500 to-red-500 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Analyze Message
            </button>

            {result && (
  <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/10">

    <h2 className="text-xl font-bold mb-3">Risk Analysis</h2>

    {/* Progress Bar */}
    <div className="w-full bg-gray-800 rounded-full h-3 mb-3 overflow-hidden">
      <div
        className={`h-3 rounded-full transition-all duration-700 ${
          result.score > 70
            ? "bg-red-500"
            : result.score > 30
            ? "bg-yellow-400"
            : "bg-green-500"
        }`}
        style={{ width: `${result.score}%` }}
      ></div>
    </div>

    <p className="mb-2 text-sm text-gray-400">
      Risk Score: {result.score}%
    </p>

    <p className={`mb-3 font-semibold ${
      result.status === "Dangerous"
        ? "text-red-400"
        : result.status === "Suspicious"
        ? "text-yellow-400"
        : "text-green-400"
    }`}>
      {result.status}
    </p>

    {/* Highlighted Text */}
    <div
      className="text-gray-300 text-sm leading-relaxed bg-black/30 p-3 rounded-md"
      dangerouslySetInnerHTML={{
        __html: highlightText(text, ["urgent","verify","otp","click","bank","password"])
      }}
    ></div>

  </div>
)}

          </div>
        </div>

      </div>
    </div>
  );
}