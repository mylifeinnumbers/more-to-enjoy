import React, { useMemo, useState } from "react";

// Life in Numbers — Poetic, All‑Positive MVP (No countdowns)
// Single-file React component. Tailwind recommended. Deploy on Netlify/Vercel.
// Inputs: name, age, (optional) location, 3 hobbies. Output: uplifting, specific lines.

export default function LifeInNumbersPoetic() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [hobbies, setHobbies] = useState(["", "", ""]);
  const [tone, setTone] = useState("warm"); // warm | playful | gentle

  // Helpers
  const toInt = (v, d = 0) => {
    const n = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(n) ? n : d;
  };

  // Constants (safe, non-medical, non-lifespan)
  const DAYS_PER_YEAR = 365;
  const YEARS_DECADE = 10;
  const SUNRISES_DECADE = DAYS_PER_YEAR * YEARS_DECADE; // 3650
  const FULLMOONS_PER_YEAR = 12; // average usable for encouragement
  const FULLMOONS_DECADE = FULLMOONS_PER_YEAR * YEARS_DECADE; // 120
  const WEEKENDS_PER_YEAR = 52; // weekend mornings to savor
  const WEEKENDS_DECADE = WEEKENDS_PER_YEAR * YEARS_DECADE; // 520 (mornings) or 1040 (both days)
  const MEALS_PER_DAY = 3; // flexible, positive frame
  const MEALS_DECADE = MEALS_PER_DAY * DAYS_PER_YEAR * YEARS_DECADE; // 10,950

  // Hobbies: assume a gentle cadence of 1x/week if left blank; user can change later in paid version
  const hobbyLines = useMemo(() => {
    const clean = hobbies.map((h) => h.trim()).filter(Boolean);
    const perYear = 52;
    const perDecade = perYear * YEARS_DECADE; // 520
    return clean.slice(0, 3).map((h) => ({
      label: h,
      perYear,
      perDecade,
    }));
  }, [hobbies]);

  const firstName = name.trim() || "Friend";
  const ageNum = toInt(age, 0);

  // Tone variants
  const toneWrap = (s) => {
    if (tone === "playful") return s.replaceAll("You", "You").replaceAll("you", "you");
    if (tone === "gentle") return s.replaceAll("You", "You").replaceAll("!", ".");
    return s; // warm (default)
  };

  const lines = useMemo(() => {
    const L = [];

    L.push(toneWrap(`${firstName}, let’s count the good things still coming.`));

    // Anchor lines — decade-based invitations
    L.push(toneWrap(`More than ${SUNRISES_DECADE.toLocaleString()} sunrises in the next decade — ${SUNRISES_DECADE.toLocaleString()} soft starts to fall in love with life again.`));
    L.push(toneWrap(`${FULLMOONS_DECADE.toLocaleString()} full moons still ahead — ${FULLMOONS_DECADE.toLocaleString()} chances to look up and feel the wonder return.`));

    // Weekend mornings: count both days gently
    L.push(toneWrap(`${(WEEKENDS_DECADE * 2).toLocaleString()} weekend mornings to stretch, sip slowly, and begin again.`));

    // Meals as connection
    L.push(toneWrap(`${MEALS_DECADE.toLocaleString()} meals to enjoy this decade — that’s ${MEALS_DECADE.toLocaleString()} invitations to slow down and connect.`));

    // Strangers/future friends — keep it positive without pretending precision
    const strangers = 2000 + (ageNum % 31) * 10; // playful variation 2000–2310
    L.push(toneWrap(`Thousands of new faces still to meet — at least ${strangers.toLocaleString()} chances for friends, mentors, and people who bring out your unfiltered self.`));

    // Hobbies personalized
    hobbyLines.forEach((h) => {
      L.push(toneWrap(`${h.perDecade.toLocaleString()} tiny ${h.label.toLowerCase()} moments in the next ten years. Even one a week becomes a beautiful stack of joy.`));
    });

    // Location flavor (optional, soft)
    if (location.trim()) {
      L.push(toneWrap(`Countless ${location.trim()} days to notice what makes home feel like home.`));
    }

    // Closing reassurance (no numbers)
    L.push(toneWrap(`And through it all: more laughter sneaking up on you, more pauses that feel like peace, more proof you’re allowed to take your time.`));

    return L;
  }, [firstName, ageNum, hobbyLines, location, tone]);

  function copyText() {
    const text = lines.join("\n\n");
    navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard ✨"));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Life in Numbers — <span className="text-indigo-600">More to Enjoy</span></h1>
          <p className="mt-2 text-slate-600">All-positive. No countdowns. Just vivid reminders of what you still get to experience — tuned to you.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Inputs */}
          <section className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input className="mt-1 w-full rounded-xl border border-slate-200 p-2 focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Cheyenne" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input type="number" min={0} className="mt-1 w-full rounded-xl border border-slate-200 p-2 focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 30" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium">Location (optional)</label>
                <input className="mt-1 w-full rounded-xl border border-slate-200 p-2 focus:ring-2 focus:ring-indigo-500" placeholder="e.g., Calgary, AB" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium">3 favourite hobbies/interests</label>
                <div className="space-y-2 mt-1">
                  {hobbies.map((h, i) => (
                    <input key={i} className="w-full rounded-xl border border-slate-200 p-2 focus:ring-2 focus:ring-indigo-500" placeholder={i === 0 ? "e.g., Drawing" : i === 1 ? "e.g., Nature photography" : "e.g., Stargazing"} value={h} onChange={(e) => setHobbies((prev) => prev.map((x, idx) => (idx === i ? e.target.value : x)))} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Tone</label>
                <select className="mt-1 w-full rounded-xl border border-slate-200 p-2 bg-white focus:ring-2 focus:ring-indigo-500" value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option value="warm">Warm & uplifting</option>
                  <option value="gentle">Gentle & cozy</option>
                  <option value="playful">Playful & sparkly</option>
                </select>
              </div>
              <button onClick={copyText} className="w-full rounded-xl px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-700">Copy as text</button>
            </div>
            <div className="mt-4 bg-white rounded-2xl shadow p-4 text-sm text-slate-600">
              Your numbers are invitations, not obligations. Even once a week becomes a beautiful stack of moments.
            </div>
          </section>

          {/* Output */}
          <section className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow p-5 space-y-4">
              {lines.map((line, i) => (
                <p key={i} className="text-slate-700 leading-relaxed">{line}</p>
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-10 text-center text-xs text-slate-500">
          Crafted with care. No countdowns — only things to look forward to. ✨
        </footer>
      </div>
    </div>
  );
}
