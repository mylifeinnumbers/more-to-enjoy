import React, { useMemo, useState } from "react";

// Life in Numbers — Poetic MVP with Smart Estimates + Pets + Random closing line
export default function LifeInNumbersPoetic() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [weeklyHobby, setWeeklyHobby] = useState("");
  const [monthlyHobby, setMonthlyHobby] = useState("");
  const [quarterlyHobby, setQuarterlyHobby] = useState("");
  const [tone, setTone] = useState("warm");
  const [gender, setGender] = useState("unspecified");
  const [smoking, setSmoking] = useState("never");
  const [drinking, setDrinking] = useState("none");
  const [conditions, setConditions] = useState("");
  const [useSmart, setUseSmart] = useState(true);

  const [petType, setPetType] = useState("none"); // dog | cat | other | none
  const [petName, setPetName] = useState("");

  const toInt = (v, d = 0) => {
    const n = parseInt(String(v).replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(n) ? n : d;
  };

  // Baselines + gentle adjustments (non-clinical)
  const baselineLE = (g) => (g === "male" ? 79 : g === "female" ? 83 : 81);
  const adjSmoking = (s) => (s === "current" ? -8 : s === "former" ? -3 : 0);
  const adjDrinking = (d) => (d === "heavy" ? -5 : d === "moderate" ? -1 : 0);
  const adjConditions = (t) => {
    t = t.toLowerCase();
    let adj = 0;
    if (t.includes("diab")) adj -= 3;
    if (t.includes("asthma")) adj -= 1;
    if (t.includes("hypertension")) adj -= 1;
    return adj;
  };

  const ageNum = toInt(age, 0);
  const expectedLifespan = Math.max(
    60,
    Math.min(
      100,
      baselineLE(gender) + adjSmoking(smoking) + adjDrinking(drinking) + adjConditions(conditions)
    )
  );
  const yearsAhead = Math.max(0, useSmart ? expectedLifespan - ageNum : 10);

  // Main counts (all formatted with commas)
  const daysAhead = Math.round(yearsAhead * 365);
  const weekendsAhead = Math.round(yearsAhead * 104);
  const fullMoonsAhead = Math.round(yearsAhead * 12);
  const mealsAhead = Math.round(yearsAhead * 365 * 3);

  // Hobbies
  const hobbyLines = [];
  if (weeklyHobby.trim())
    hobbyLines.push({ label: weeklyHobby, total: Math.round(52 * yearsAhead), freq: "weekly" });
  if (monthlyHobby.trim())
    hobbyLines.push({ label: monthlyHobby, total: Math.round(12 * yearsAhead), freq: "monthly" });
  if (quarterlyHobby.trim())
    hobbyLines.push({
      label: quarterlyHobby,
      total: Math.round(4 * yearsAhead),
      freq: "quarterly",
    });

  const toneWrap = (s) => (tone === "gentle" ? s.replace(/!/g, ".") : s);

  // Randomized closing line (changes when inputs change)
  const closingOptions = [
    "Doesn’t it feel good to be alive?",
    "What a gift it is to be here for it all.",
    "You’ve got so much more to smile about.",
    "The best is still unfolding.",
    "Isn’t it a beautiful thing to be here now?",
  ];
  const closing = useMemo(() => {
    const i = Math.floor(Math.random() * closingOptions.length);
    return closingOptions[i];
  }, [
    name,
    age,
    gender,
    smoking,
    drinking,
    conditions,
    weeklyHobby,
    monthlyHobby,
    quarterlyHobby,
    location,
    petType,
    petName,
    useSmart,
    tone,
  ]);

  const petLine = useMemo(() => {
    const n = petName.trim();
    if (!n || petType === "none") return "";
    if (petType === "dog") return `Plenty of belly rubs and tail wags with ${n}.`;
    if (petType === "cat") return `Plenty of cozy, purr-filled nights with ${n}.`;
    return `Plenty of little moments with ${n} that feel like home.`;
  }, [petType, petName]);

  const lines = useMemo(() => {
    const L = [];
    const firstName = name || "Friend";
    L.push(toneWrap(`${firstName}, let’s count the good things still coming.`));
    if (useSmart)
      L.push(
        toneWrap(
          `About ${Math.max(1, Math.round(yearsAhead)).toLocaleString()} more years of moments to notice, explore, and enjoy.`
        )
      );
    else L.push(toneWrap(`Let’s look at the next ten years and fill them with gentle joys.`));

    L.push(
      toneWrap(
        `${daysAhead.toLocaleString()} sunrises still ahead — that many soft starts to fall in love with life again.`
      )
    );
    L.push(
      toneWrap(
        `${fullMoonsAhead.toLocaleString()} full moons to look up at — reminders that wonder keeps returning.`
      )
    );
    L.push(
      toneWrap(
        `${weekendsAhead.toLocaleString()} weekend mornings to stretch, sip slowly, and begin again.`
      )
    );
    L.push(
      toneWrap(`${mealsAhead.toLocaleString()} meals to enjoy — invitations to slow down and connect.`)
    );

    // Future faces — playful estimate tied to yearsAhead
    const faces = Math.max(0, Math.round(yearsAhead * 180)).toLocaleString();
    L.push(
      toneWrap(
        `${faces}+ new faces you haven’t met yet — friends, mentors, and people who bring out your unfiltered self.`
      )
    );

    hobbyLines.forEach((h) =>
      L.push(
        toneWrap(
          `${h.total.toLocaleString()} ${h.freq} ${h.label.toLowerCase()} moments to stack — even at this pace it becomes a beautiful pattern.`
        )
      )
    );

    if (location.trim())
      L.push(toneWrap(`Plenty of ${location} days to notice what makes home feel like home.`));

    if (petLine) L.push(toneWrap(petLine));

    // Encouraging randomized closer
    L.push(toneWrap(closing));

    return L;
  }, [
    name,
    yearsAhead,
    daysAhead,
    fullMoonsAhead,
    weekendsAhead,
    mealsAhead,
    hobbyLines,
    location,
    tone,
    useSmart,
    petLine,
    closing,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">
            Life in Numbers — <span className="text-indigo-600">More to Enjoy</span>
          </h1>
          <p className="mt-2 text-slate-600">
            All-positive. Toggle Smart estimates to tailor counts from public averages.
          </p>
          <p className="mt-1 text-xs text-rose-500 font-medium">
            Disclaimer: This tool provides encouraging, non-clinical estimates based on public
            averages and self-inputted factors. It is not a medical diagnosis, health advice, or a
            substitute for professional care.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Interested in a more comprehensive, personalized version? Email us at{" "}
            <a className="underline" href="mailto:pause@offtherecord-onpurpose.ca">
              pause@offtherecord-onpurpose.ca
            </a>{" "}
            for details about the paid upgrade.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Inputs */}
          <section className="md:col-span-1 bg-white rounded-2xl shadow p-4 space-y-4">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="unspecified">Gender (optional)</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
            </select>
            <select
              value={smoking}
              onChange={(e) => setSmoking(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="never">Never smoked</option>
              <option value="former">Former smoker</option>
              <option value="current">Current smoker</option>
            </select>
            <select
              value={drinking}
              onChange={(e) => setDrinking(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="none">Does not drink</option>
              <option value="moderate">Drinks moderately</option>
              <option value="heavy">Drinks heavily</option>
            </select>
            <select
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Medical conditions (optional)</option>
              <option value="none">None</option>
              <option value="diabetes">Diabetes</option>
              <option value="asthma">Asthma</option>
              <option value="hypertension">Hypertension</option>
              <option value="other">Not on list</option>
            </select>

            <input
              placeholder="Favourite weekly activity"
              value={weeklyHobby}
              onChange={(e) => setWeeklyHobby(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              placeholder="Favourite monthly activity"
              value={monthlyHobby}
              onChange={(e) => setMonthlyHobby(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              placeholder="Favourite quarterly activity"
              value={quarterlyHobby}
              onChange={(e) => setQuarterlyHobby(e.target.value)}
              className="w-full border p-2 rounded"
            />

            {/* Pet fields */}
            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="none">Pet type (optional)</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
            <input
              placeholder="Pet name (optional)"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="Location (optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="warm">Warm</option>
              <option value="gentle">Gentle</option>
              <option value="playful">Playful</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useSmart}
                onChange={(e) => setUseSmart(e.target.checked)}
              />
              Smart estimates
            </label>
          </section>

          {/* Output */}
          <section className="md:col-span-2 bg-white rounded-2xl shadow p-5 space-y-4">
            {lines.map((line, i) => (
              <p key={i} className="leading-relaxed">
                {line}
              </p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
