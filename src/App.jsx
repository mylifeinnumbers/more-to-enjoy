import React, { useMemo, useState } from "react";

// Life in Numbers — Poetic MVP with Smart Estimates
export default function LifeInNumbersPoetic() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [hobbies, setHobbies] = useState(["", "", ""]);
  const [tone, setTone] = useState("warm");
  const [gender, setGender] = useState("unspecified");
  const [smoking, setSmoking] = useState("never");
  const [activity, setActivity] = useState("moderate");
  const [conditions, setConditions] = useState("");
  const [useSmart, setUseSmart] = useState(true);

  const toInt = (v, d = 0) => {
    const n = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(n) ? n : d;
  };

  const baselineLE = (g) => g === "male" ? 79 : g === "female" ? 83 : 81;
  const adjSmoking = (s) => s === "current" ? -8 : s === "former" ? -3 : 0;
  const adjActivity = (a) => a === "high" ? 2 : a === "low" ? -2 : 0;
  const adjConditions = (t) => {
    t = t.toLowerCase();
    let adj = 0;
    if (t.includes("diab")) adj -= 3;
    if (t.includes("asthma")) adj -= 1;
    if (t.includes("hypertension")) adj -= 1;
    return adj;
  };

  const ageNum = toInt(age, 0);
  const expectedLifespan = Math.max(60, Math.min(100, baselineLE(gender) + adjSmoking(smoking) + adjActivity(activity) + adjConditions(conditions)));
  const yearsAhead = Math.max(0, useSmart ? expectedLifespan - ageNum : 10);

  const daysAhead = Math.round(yearsAhead * 365);
  const weekendsAhead = Math.round(yearsAhead * 104);
  const fullMoonsAhead = Math.round(yearsAhead * 12);
  const mealsAhead = Math.round(yearsAhead * 365 * 3);

  const hobbyLines = hobbies.map((h) => h.trim()).filter(Boolean).map((h) => ({
    label: h,
    total: Math.round(52 * yearsAhead)
  }));

  const toneWrap = (s) => tone === "gentle" ? s.replace(/!/g, ".") : s;

  const lines = useMemo(() => {
    const L = [];
    L.push(toneWrap(`${name || "Friend"}, let’s count the good things still coming.`));
    if (useSmart) L.push(toneWrap(`About ${Math.max(1, Math.round(yearsAhead))} more years of moments to notice, explore, and enjoy.`));
    else L.push(toneWrap(`Let’s look at the next ten years and fill them with gentle joys.`));
    L.push(toneWrap(`${daysAhead} sunrises still ahead — that many soft starts to fall in love with life again.`));
    L.push(toneWrap(`${fullMoonsAhead} full moons to look up at — reminders that wonder keeps returning.`));
    L.push(toneWrap(`${weekendsAhead} weekend mornings to stretch, sip slowly, and begin again.`));
    L.push(toneWrap(`${mealsAhead} meals to enjoy — invitations to slow down and connect.`));
    L.push(toneWrap(`${Math.round(yearsAhead * 180)}+ new faces you haven’t met yet — friends, mentors, and people who bring out your unfiltered self.`));
    hobbyLines.forEach((h) => L.push(toneWrap(`${h.total} tiny ${h.label.toLowerCase()} moments to stack — even once a week becomes a beautiful pattern.`)));
    if (location.trim()) L.push(toneWrap(`Plenty of ${location} days to notice what makes home feel like home.`));
    L.push(toneWrap(`And through it all: more laughter sneaking up on you, more pauses that feel like peace, more proof you’re allowed to take your time.`));
    return L;
  }, [name, yearsAhead, daysAhead, fullMoonsAhead, weekendsAhead, mealsAhead, hobbyLines, location, tone, useSmart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Life in Numbers — <span className="text-indigo-600">More to Enjoy</span></h1>
          <p className="mt-2 text-slate-600">All-positive. Toggle Smart estimates to tailor counts from public averages.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-1 bg-white rounded-2xl shadow p-4 space-y-4">
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
            <input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full border p-2 rounded" />
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border p-2 rounded">
              <option value="unspecified">Gender (optional)</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
            </select>
            <select value={smoking} onChange={(e) => setSmoking(e.target.value)} className="w-full border p-2 rounded">
              <option value="never">Never smoked</option>
              <option value="former">Former smoker</option>
              <option value="current">Current smoker</option>
            </select>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full border p-2 rounded">
              <option value="moderate">Activity: Moderate</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
            <input placeholder="Conditions (optional)" value={conditions} onChange={(e) => setConditions(e.target.value)} className="w-full border p-2 rounded" />
            {hobbies.map((h, i) => <input key={i} placeholder={`Hobby ${i+1}`} value={h} onChange={(e) => setHobbies(hobbies.map((x, idx) => idx === i ? e.target.value : x))} className="w-full border p-2 rounded" />)}
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full border p-2 rounded">
              <option value="warm">Warm</option>
              <option value="gentle">Gentle</option>
              <option value="playful">Playful</option>
            </select>
            <label className="flex items-center gap-2"><input type="checkbox" checked={useSmart} onChange={(e) => setUseSmart(e.target.checked)} /> Smart estimates</label>
          </section>

          <section className="md:col-span-2 bg-white rounded-2xl shadow p-5 space-y-4">
            {lines.map((line, i) => <p key={i}>{line}</p>)}
          </section>
        </div>
      </div>
    </div>
  );
}
