"use client";

import { useEffect, useMemo, useState } from "react";

type Section = "home" | "lessons" | "quizzes" | "games" | "rewards" | "progress";
type Student = { name: string; grade: number; avatar: number };
type Progress = { completed: string[]; stars: number; badges: string[]; streak: number };

const NAV: { id: Exclude<Section, "home">; label: string; icon: string }[] = [
  { id: "lessons", label: "Lessons", icon: "/assets/lessons.jpg" },
  { id: "quizzes", label: "Quizzes", icon: "/assets/quiz.jpg" },
  { id: "games", label: "Games", icon: "/assets/games.jpg" },
  { id: "rewards", label: "Rewards", icon: "/assets/rewards.jpg" },
  { id: "progress", label: "Progress", icon: "/assets/progress.jpg" },
];

const THEMES: Record<number, { title: string; subtitle: string; lessons: string[] }> = {
  1: { title: "Words Around Me", subtitle: "Listen, look and build your first sentences.", lessons: ["My Classroom", "My Family", "Animals Around Us", "Colours & Shapes"] },
  2: { title: "Stories We Love", subtitle: "Read short paragraphs and tell events in order.", lessons: ["Describing People", "Story Sequencing", "Animals & Habitats", "Simple Procedures"] },
  3: { title: "Confident Storytellers", subtitle: "Explore themes, summaries, letters and diaries.", lessons: ["Story Retelling", "Descriptive Writing", "Friendly Letters", "Diary Writing"] },
  4: { title: "Readers & Reporters", subtitle: "Compare texts, explore mood and explain ideas.", lessons: ["Fiction Series", "Mood & Tone", "Information Reports", "How Things Work"] },
  5: { title: "Powerful Voices", subtitle: "Use evidence, interpret media and share opinions.", lessons: ["Memoirs", "Opinion Writing", "Media Messages", "Plays & Poems"] },
};

const GAMES = [
  ["Word Match", "Match words to meanings", "/assets/word-match.jpg"],
  ["Spelling Bee", "Build words letter by letter", "/assets/spelling-bee.jpg"],
  ["Reading Race", "Read carefully and find clues", "/assets/reading-race.jpg"],
  ["Story Builder", "Put story moments in order", "/assets/story-builder.jpg"],
  ["Grammar Hero", "Rescue sentences from mistakes", "/assets/grammar-hero.jpg"],
];

const BADGES = ["Starfish Scholar", "Dolphin Reader", "Reef Explorer", "Coconut Hero", "Lagoon Champion", "Coral Writer", "Turtle Thinker", "Seashell Genius"];
const QUIZZES: Record<number, { q: string; options: string[]; answer: number; hint: string }> = {
  1: { q: "Which sentence begins correctly?", options: ["this is my bag.", "This is my bag.", "this Is my bag"], answer: 1, hint: "A sentence begins with a capital letter and ends with a full stop." },
  2: { q: "Which word shows what comes after ‘first’?", options: ["Next", "Blue", "Quiet"], answer: 0, hint: "We use sequencing words to order steps." },
  3: { q: "Which sentence gives an opinion and a reason?", options: ["The reef is blue.", "I like the story because it is funny.", "Open the book."], answer: 1, hint: "Look for ‘I think’ or ‘I like’ followed by ‘because’." },
  4: { q: "Which heading best fits facts about how turtles grow?", options: ["A Funny Day", "The Turtle Life Cycle", "My Favourite Food"], answer: 1, hint: "A heading tells the reader what the information is about." },
  5: { q: "Which phrase uses imagery?", options: ["The sun was a golden lantern.", "The sun is hot.", "I saw the sun."], answer: 0, hint: "Imagery helps you form a strong picture in your mind." },
};

const emptyProgress: Progress = { completed: [], stars: 0, badges: [], streak: 1 };

export default function OceanLearnApp() {
  const [student, setStudent] = useState<Student | null>(null);
  const [section, setSection] = useState<Section>("home");
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem("oceanlearn.student.v1");
      const savedProgress = localStorage.getItem("oceanlearn.progress.v1");
      if (savedStudent) setStudent(JSON.parse(savedStudent));
      if (savedProgress) setProgress({ ...emptyProgress, ...JSON.parse(savedProgress) });
    } catch { localStorage.removeItem("oceanlearn.student.v1"); }
    setReady(true);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (student) localStorage.setItem("oceanlearn.student.v1", JSON.stringify(student));
    localStorage.setItem("oceanlearn.progress.v1", JSON.stringify(progress));
  }, [student, progress, ready]);

  const celebrate = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  if (!ready) return <main className="loading"><div className="bubble-loader" /><p>Swimming to OceanLearn…</p></main>;
  if (!student) return <Onboarding onStart={setStudent} />;

  const complete = (id: string, stars = 3) => {
    if (progress.completed.includes(id)) return celebrate("You already completed this adventure!");
    const nextCompleted = [...progress.completed, id];
    const earned = BADGES[Math.min(Math.floor(nextCompleted.length / 2), BADGES.length - 1)];
    setProgress({ ...progress, completed: nextCompleted, stars: progress.stars + stars, badges: nextCompleted.length % 2 === 0 && !progress.badges.includes(earned) ? [...progress.badges, earned] : progress.badges });
    celebrate(`Wonderful work! +${stars} stars`);
  };

  const reset = () => {
    if (confirm("Reset all OceanLearn progress on this device? This cannot be undone.")) {
      setProgress(emptyProgress);
      celebrate("Progress reset. A fresh adventure begins!");
    }
  };

  const logout = () => {
    localStorage.removeItem("oceanlearn.student.v1");
    setStudent(null);
    setSection("home");
  };

  return (
    <div className="app-shell">
      <header className="top-dock">
        <button className="brand" onClick={() => setSection("home")} aria-label="OceanLearn home"><img src="/assets/logo.jpg" alt="" /><span>Ocean<span>Learn</span></span></button>
        <div className="student-chip"><span className="avatar-mini" aria-hidden="true">{["🐚","🐬","🐢","⭐","🦀", "🌴"][student.avatar]}</span><div><small>Explorer</small><strong>{student.name}</strong></div></div>
        <div className="top-actions">
          <button onClick={reset} title="Reset progress"><img src="/assets/reset.jpg" alt=""/><span>Reset</span></button>
          <button onClick={logout} title="Log out"><img src="/assets/logout.jpg" alt=""/><span>Logout</span></button>
        </div>
      </header>

      <main className="main-content">
        {section === "home" && <Dashboard student={student} progress={progress} go={setSection} />}
        {section === "lessons" && <Lessons grade={student.grade} progress={progress} complete={complete} />}
        {section === "quizzes" && <Quiz grade={student.grade} complete={complete} />}
        {section === "games" && <Games complete={complete} />}
        {section === "rewards" && <Rewards progress={progress} />}
        {section === "progress" && <ProgressView student={student} progress={progress} />}
      </main>

      <nav className="bottom-dock" aria-label="Main navigation">
        {NAV.map(item => <button key={item.id} className={section === item.id ? "active" : ""} aria-current={section === item.id ? "page" : undefined} onClick={() => setSection(item.id)}><img src={item.icon} alt=""/><span>{item.label}</span></button>)}
      </nav>
      {toast && <div className="toast" role="status">⭐ {toast}</div>}
    </div>
  );
}

function Onboarding({ onStart }: { onStart: (student: Student) => void }) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(1);
  const [avatar, setAvatar] = useState(2);
  const icons = ["🐚","🐬","🐢","⭐","🦀", "🌴"];
  return <main className="onboarding">
    <section className="welcome-card">
      <img className="welcome-art" src="/assets/splash.jpg" alt="Friendly ocean animals by a sunny Maldivian island" />
      <div className="welcome-form">
        <div className="eyebrow">WELCOME, EXPLORER!</div>
        <h1>Your English adventure starts here</h1>
        <p>Learn with stories, games and friendly island guides.</p>
        <label>Your name<input value={name} maxLength={18} onChange={e => setName(e.target.value)} placeholder="Type your name" /></label>
        <fieldset><legend>Choose your grade</legend><div className="grade-row">{[1,2,3,4,5].map(g => <button type="button" className={grade === g ? "selected" : ""} onClick={() => setGrade(g)} key={g}>Grade {g}</button>)}</div></fieldset>
        <fieldset><legend>Choose your ocean buddy</legend><div className="avatar-row">{icons.map((icon, i) => <button type="button" aria-label={`Buddy ${i + 1}`} className={avatar === i ? "selected" : ""} onClick={() => setAvatar(i)} key={i}>{icon}</button>)}</div></fieldset>
        <button className="primary-button" disabled={!name.trim()} onClick={() => onStart({ name: name.trim(), grade, avatar })}>Dive in! <span>→</span></button>
      </div>
    </section>
  </main>;
}

function Dashboard({ student, progress, go }: { student: Student; progress: Progress; go: (s: Section) => void }) {
  const theme = THEMES[student.grade];
  return <>
    <section className="hero-panel">
      <div><div className="eyebrow">GRADE {student.grade} • TERM 1</div><h1>މަރުހަބާ, {student.name}! <span>Hello!</span></h1><p>Ready to explore a new English adventure?</p><button className="primary-button compact" onClick={() => go("lessons")}>Continue learning <span>→</span></button></div>
      <img src="/assets/turtle.jpg" alt="Cheerful turtle mascot" />
      <div className="sun" aria-hidden="true" />
    </section>
    <section className="stats-row" aria-label="Learning summary">
      <article><span className="stat-icon coral">🔥</span><div><strong>{progress.streak}</strong><small>day streak</small></div></article>
      <article><span className="stat-icon yellow">★</span><div><strong>{progress.stars}</strong><small>stars earned</small></div></article>
      <article><span className="stat-icon teal">✓</span><div><strong>{progress.completed.length}</strong><small>activities done</small></div></article>
    </section>
    <div className="section-heading"><div><span className="eyebrow">TODAY'S ADVENTURE</span><h2>{theme.title}</h2></div><button className="text-button" onClick={() => go("lessons")}>See all lessons →</button></div>
    <section className="featured-grid">
      <article className="featured-card"><img src="/assets/lesson-set.jpg" alt="Ocean-themed English learning activities"/><div><span className="pill">NEXT LESSON</span><h3>{theme.lessons[0]}</h3><p>{theme.subtitle}</p><div className="mini-progress"><span style={{width: progress.completed.length ? "65%" : "18%"}}/></div><button onClick={() => go("lessons")}>Start lesson</button></div></article>
      <article className="mascot-note"><img src="/assets/dolphin.jpg" alt="Dolphin guide"/><div><span className="eyebrow">DOLPHIN'S TIP</span><h3>Say it out loud!</h3><p>Reading aloud helps new words stick in your memory.</p></div></article>
    </section>
  </>;
}

function Lessons({ grade, progress, complete }: { grade: number; progress: Progress; complete: (id: string) => void }) {
  const theme = THEMES[grade];
  return <section><PageTitle eyebrow={`GRADE ${grade} • ENGLISH`} title="Your learning lagoon" text={theme.subtitle}/><div className="lesson-list">{theme.lessons.map((lesson, i) => { const id = `g${grade}-lesson-${i}`; const done = progress.completed.includes(id); return <article className="lesson-card" key={lesson}><span className="lesson-number">{done ? "✓" : i + 1}</span><div><span className="eyebrow">{["SPEAK & LISTEN", "READ & VIEW", "WRITE & CREATE", "CHECK YOUR SKILLS"][i]}</span><h3>{lesson}</h3><p>{i === 0 ? "Meet useful words, listen carefully and practise with your island friends." : "Build on your skills with a short story, guided examples and a playful challenge."}</p></div><button className={done ? "done-button" : "small-button"} onClick={() => complete(id)}>{done ? "Completed" : "Complete lesson"}</button></article>})}</div></section>;
}

function Quiz({ grade, complete }: { grade: number; complete: (id: string, stars?: number) => void }) {
  const quiz = QUIZZES[grade];
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = choice === quiz.answer;
  const check = () => { setChecked(true); if (choice === quiz.answer) complete(`g${grade}-quiz`, 5); };
  return <section><PageTitle eyebrow={`GRADE ${grade} CHALLENGE`} title="Quiz Cove" text="Take your time. Every answer helps your brain grow!"/><article className="quiz-panel"><div className="quiz-art"><img src="/assets/quiz-illustration.jpg" alt="Ocean friends thinking about a quiz question"/><span>1 of 1</span></div><div className="question"><span className="pill">ENGLISH QUIZ</span><h2>{quiz.q}</h2><div className="options">{quiz.options.map((option, i) => <button key={option} disabled={checked} onClick={() => setChoice(i)} className={`${choice === i ? "chosen" : ""} ${checked && i === quiz.answer ? "correct" : ""} ${checked && choice === i && !correct ? "wrong" : ""}`}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>{checked && <div className={`feedback ${correct ? "success" : "try"}`} role="status"><strong>{correct ? "Fin-tastic! That’s right." : "Good try—have another look."}</strong><p>{quiz.hint}</p>{!correct && <button onClick={() => {setChecked(false); setChoice(null)}}>Try again</button>}</div>} {!checked && <button className="primary-button compact" disabled={choice === null} onClick={check}>Check my answer</button>}</div></article></section>;
}

function Games({ complete }: { complete: (id: string, stars?: number) => void }) {
  return <section><PageTitle eyebrow="PLAY • PRACTISE • GROW" title="Game Reef" text="Choose a game and practise English while you play."/><div className="game-grid">{GAMES.map(([title, text, image], i) => <article className="game-card" key={title}><img src={image} alt={`${title} game cover`}/><div><span className="pill">{i < 2 ? "QUICK PLAY" : "ADVENTURE"}</span><h3>{title}</h3><p>{text}</p><button onClick={() => complete(`game-${i}`, 2)}>Play round</button></div></article>)}</div></section>;
}

function Rewards({ progress }: { progress: Progress }) {
  return <section><PageTitle eyebrow="YOUR COLLECTION" title="Treasure Chest" text="Every new skill brings you closer to another island badge."/><div className="reward-hero"><img src="/assets/badges.jpg" alt="OceanLearn achievement badge collection"/><div><strong>{progress.badges.length} / {BADGES.length}</strong><span>featured badges unlocked</span></div></div><div className="badge-grid">{BADGES.map((badge, i) => {const unlocked = progress.badges.includes(badge); return <article className={unlocked ? "unlocked" : "locked"} key={badge}><span>{["⭐","🐬","🤿","🌴","🌊","🪸","🐢","🐚"][i]}</span><h3>{badge}</h3><p>{unlocked ? "Unlocked—wonderful work!" : `Complete ${Math.max(1, (i+1)*2)} activities to discover.`}</p></article>})}</div></section>;
}

function ProgressView({ student, progress }: { student: Student; progress: Progress }) {
  const percent = Math.min(100, Math.round(progress.completed.length / 12 * 100));
  return <section><PageTitle eyebrow={`GRADE ${student.grade} JOURNEY`} title={`${student.name}’s progress`} text="Small steps make strong readers, speakers and writers."/><div className="progress-layout"><article className="big-progress"><div className="progress-circle" style={{"--value": `${percent * 3.6}deg`} as React.CSSProperties}><span><strong>{percent}%</strong><small>term journey</small></span></div><div><h3>You’re making waves!</h3><p>Keep exploring lessons, quizzes and games to fill your lagoon.</p></div></article><article className="skills-card"><h3>English skills</h3>{["Speaking & Listening", "Reading & Viewing", "Writing & Representing"].map((skill, i) => <div className="skill" key={skill}><div><span>{skill}</span><strong>{Math.min(100, percent + i * 7)}%</strong></div><div><span style={{width: `${Math.min(100, percent + i * 7)}%`}}/></div></div>)}</article></div></section>;
}

function PageTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <header className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></header>; }
