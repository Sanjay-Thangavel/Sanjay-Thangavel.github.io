import { useEffect, useRef, useState, type KeyboardEvent, type CSSProperties } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, Volume2, VolumeX, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMode, type Mode } from './hooks/useMode'
import { campusActivities, clubs, educationCourses, educationHighlights, experiences, personalProjects, projects, saclExperience } from './data/portfolio'
import { TechIcon, TechStack } from './components/TechStack'
import './App.css'
import './portfolio.css'

const githubUrl = 'https://github.com/Sanjay-Thangavel'
const linkedinUrl = 'https://www.linkedin.com/in/sanjay-thangavel-5282a31bb/'
const emailAddress = 'sanjay.thangavel.it@gmail.com'

function yearsAtCiti() {
  const start = new Date(2024, 6, 1)
  const now = new Date()
  const months = Math.max(0, (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth() + 1)
  const years = Math.floor(months / 12)
  const remainder = months % 12
  return [years ? `${years} yr${years === 1 ? '' : 's'}` : '', remainder ? `${remainder} mo${remainder === 1 ? '' : 's'}` : ''].filter(Boolean).join(' ')
}

function App() {
  const { mode, setMode } = useMode()
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [transitionMode, setTransitionMode] = useState<Mode | null>(null)
  const [personalDiscovered, setPersonalDiscovered] = useState(false)
  const [showDiscovery, setShowDiscovery] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const personal = mode === 'personal'

  useEffect(() => { document.documentElement.dataset.mode = mode }, [mode])
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])
  useEffect(() => {
    if (!lightbox) return
    const onKeyDown = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  function changeMode(nextMode: Mode) {
    if (nextMode === mode) return
    window.clearTimeout(timer.current)
    setMode(nextMode)
    setTransitionMode(nextMode)
    if (!reducedMotion && soundOn && window.AudioContext) {
      const audio = new window.AudioContext()
      const oscillator = audio.createOscillator()
      const gain = audio.createGain()
      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(660, audio.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(990, audio.currentTime + 0.08)
      gain.gain.setValueAtTime(0.035, audio.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.13)
      oscillator.connect(gain)
      gain.connect(audio.destination)
      oscillator.start()
      oscillator.stop(audio.currentTime + 0.13)
      oscillator.onended = () => void audio.close()
    }
    if (nextMode === 'personal' && !personalDiscovered) {
      setPersonalDiscovered(true)
      setShowDiscovery(true)
      window.setTimeout(() => setShowDiscovery(false), 2200)
    }
    timer.current = window.setTimeout(() => setTransitionMode(null), reducedMotion ? 220 : 1450)
  }

  const navItems = personal
    ? []
    : [{ href: '#skills', label: 'Skills' }, { href: '#experience', label: 'Experience' }, { href: '#projects', label: 'Projects' }, { href: '#education', label: 'Education' }, { href: '#contact', label: 'Contact' }]

  return <div className={`site-shell ${personal ? 'is-personal' : 'is-professional'}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="topbar"><a className="wordmark" href="#top" aria-label="Sanjay Thangavel, back to top">ST<span>.</span></a><nav aria-label="Main navigation">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><a className="topbar-contact" href={`mailto:${emailAddress}`}>LET'S TALK <ArrowUpRight size={15} /></a></header>
    <main id="main">
      <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
        <div className="hero-label"><span className="label-index">01</span> INTRODUCTION <span className="label-rule" /></div>
        <div className="hero-name-block"><p className="eyebrow">HELLO, I'M</p><h1 id="hero-title">SANJAY<br /><mark>THANGAVEL</mark></h1></div>
        <p className="hero-role">{personal ? 'EXTRACURRICULARS' : 'Technology Analyst'} <span>•</span> {personal ? 'THEATRE & NCC' : 'Data Science Aspirant'}</p>
        <div className="hero-org">{personal ? 'SCHOOL & UNIVERSITY EXPERIENCES' : <>@ Citi <span>·</span> US Personal Banking Datalake</>}</div>
        <ModeToggle mode={mode} onChange={changeMode} soundOn={soundOn} onSoundChange={setSoundOn} />
        <div className="hero-art"><div className="portrait-frame"><img key={mode} className="portrait-image" src={personal ? '/images/personal-portrait.webp' : '/images/professional-portrait.jpg'} alt={personal ? 'Sanjay outdoors in a casual shirt' : 'Sanjay in professional attire'} fetchPriority="high" /><span className="portrait-caption">{personal ? 'OFF THE CLOCK' : 'AT WORK'}</span></div><span className="art-sticker art-sticker-top">{personal ? 'LEADERSHIP' : 'ACTIVE LEARNER'}</span><span className="art-sticker art-sticker-bottom">{personal ? 'TEAMWORK' : 'CLOUD DATA'}</span><span className="mode-hud">MODE: {personal ? 'PERSONAL' : 'PROFESSIONAL'}</span>{showDiscovery && <span className="xp-note" aria-live="polite">+10 XP · New side discovered</span>}</div>
        <p className="hero-statement">{personal ? 'Outside work, I make time for extracurricular pursuits that bring creative collaboration, leadership, and community together.' : 'I’m a technology professional focused on building dependable data and software solutions, with experience across ETL/ELT pipelines, feed validation, database migration, and full-stack application delivery. My current work with cloud data platforms informs my growing interest in data science, machine learning, and analytics. I value clear problem-solving, continuous learning, and technology that delivers practical value.'}</p>
        <div className="hero-actions">{personal ? <><a className="button button-primary" href="#activities">EXPLORE ACTIVITIES <ArrowRight size={17} /></a><a className="button button-light" href={`mailto:${emailAddress}`}>SAY HI <Mail size={16} /></a></> : <><a className="button button-primary" href="#experience">VIEW MY WORK <ArrowRight size={17} /></a><a className="button button-light" href={githubUrl} target="_blank" rel="noreferrer">GITHUB</a><a className="button button-light" href={linkedinUrl} target="_blank" rel="noreferrer">LINKEDIN</a><a className="button button-light" href="/Sanjay-Thangavel-Resume-2026.pdf" download>DOWNLOAD CV <ArrowDown size={15} /></a></>}</div>
        <a className="scroll-cue" href={personal ? '#activities' : '#experience'}><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></a><span className="hero-side-note" aria-hidden="true">CHENNAI · INDIA</span>
      </section>
      {personal ? <PersonalView onOpenImage={setLightbox} /> : <><TechStack /><ProfessionalView /></>}
      <section className="contact-section section-wrap" id="contact"><div className="section-kicker">06 <span>CONTACT</span></div><div className="contact-layout"><div><p className="eyebrow">GOOD THINGS START WITH A HELLO</p><h2>LET'S <mark>CONNECT</mark></h2><p className="contact-copy">Have an opportunity, a program, or a problem worth solving? Let's talk.</p></div><div className="contact-links"><a className="button button-primary" href={`mailto:${emailAddress}`}>EMAIL <ArrowUpRight size={17} /></a><a className="button button-light" href={linkedinUrl} target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={15} /></a><a className="button button-light" href={githubUrl} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={15} /></a><a className="button button-light" href="/Sanjay-Thangavel-Resume-2026.pdf" download>DOWNLOAD CV <ArrowDown size={15} /></a></div></div></section>
    </main>
    <footer className="footer section-wrap"><a className="wordmark" href="#top">ST<span>.</span></a><p>Sanjay Thangavel <span>·</span> Technology Analyst · Data Science Aspirant</p><p>© 2026 SANJAY THANGAVEL</p></footer>
    <div className="live-region" aria-live="polite" aria-atomic="true">{transitionMode ? `${transitionMode === 'personal' ? 'Personal' : 'Professional'} mode selected` : ''}</div>
    {transitionMode && <ModeTransition mode={transitionMode} reducedMotion={Boolean(reducedMotion)} />}
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image"><X /></button><img src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} /></div>}
  </div>
}

function ModeToggle({ mode, onChange, soundOn, onSoundChange }: { mode: Mode; onChange: (mode: Mode) => void; soundOn: boolean; onSoundChange: (enabled: boolean) => void }) {
  const [used, setUsed] = useState(false)
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const nextMode = mode === 'professional' ? 'personal' : 'professional'
    onChange(nextMode)
    event.currentTarget.querySelector<HTMLButtonElement>(`[data-mode-tab="${nextMode}"]`)?.focus()
    setUsed(true)
  }
  return <div className="mode-control"><div className="mode-control-heading"><span>PLAYER MODE</span><span className="mode-control-dots" aria-hidden="true">● ● ●</span></div><div className="mode-switch" role="tablist" aria-label="Choose portfolio mode" onKeyDown={onKeyDown}>
    <button data-mode-tab="professional" role="tab" aria-selected={mode === 'professional'} tabIndex={mode === 'professional' ? 0 : -1} className={mode === 'professional' ? 'active' : ''} onClick={() => { onChange('professional'); setUsed(true) }}>▶ PROFESSIONAL</button>
    <button data-mode-tab="personal" role="tab" aria-selected={mode === 'personal'} tabIndex={mode === 'personal' ? 0 : -1} className={mode === 'personal' ? 'active' : ''} onClick={() => { onChange('personal'); setUsed(true) }}>★ PERSONAL</button>
  </div>{!used && <div className="mode-hint"><span className="hint-pointer">↗</span><strong>Psst! There's more of me.</strong><span>Press here · Same page, two sides.</span></div>}<button className="sound-toggle" type="button" onClick={() => onSoundChange(!soundOn)} aria-label={soundOn ? 'Mute mode sound' : 'Enable mode sound'} title={soundOn ? 'Mute sound' : 'Enable sound'}>{soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>SOUND {soundOn ? 'ON' : 'OFF'}</span></button></div>
}

function ModeTransition({ mode, reducedMotion }: { mode: Mode; reducedMotion: boolean }) {
  return <div className={`mode-transition ${reducedMotion ? 'reduced' : ''}`} data-mode={mode} aria-hidden="true">{!reducedMotion && <div className="confetti">{Array.from({ length: 40 }, (_, index) => <i key={index} style={{ '--i': index, '--r': `${(index * 47) % 360}deg` } as CSSProperties} />)}</div>}<div className="transition-banner">{mode === 'personal' ? 'LEVEL UNLOCKED: PERSONAL MODE' : 'BACK TO CAREER MODE'}</div></div>
}

function ExperienceEntry({ item, index, companyLogo, companyAlt }: { item: typeof experiences[number] | typeof saclExperience; index: number; companyLogo?: string; companyAlt?: string }) {
  return <motion.article className="timeline-entry" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.45, delay: index * 0.06 }}>
    <div className="timeline-date">{item.date}<span>{item.current ? 'CURRENT' : item.type}</span></div>
    <div className="experience-card"><div className="entry-heading">{companyLogo && <img className="entry-company-logo" src={companyLogo} alt={companyAlt} />}<h3>{item.title}</h3>{item.showBand && item.band && <span className={`band-tag band-${item.band.toLowerCase()}`}>{item.band}</span>}</div>
      {'team' in item && item.team && <p className="entry-meta">Team: <strong>{item.team}</strong>{item.location ? ` · ${item.location}` : ''}</p>}
      <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      <div className="experience-tech"><span className="experience-tech-label">TOOLS & PRACTICE</span><div>{item.tags.map((tag) => <span className="experience-skill" key={tag}><TechIcon name={tag} />{tag}</span>)}</div></div>
    </div>
  </motion.article>
}

function ProfessionalView() {
  return <>
    <section className="content-section section-wrap" id="experience"><div className="section-heading"><div><div className="section-kicker">03 <span>CAREER</span></div><h2>EXPERIENCE <mark>IN MOTION</mark></h2></div><p>Cloud data platforms, reliable pipelines, and practical tools built around real operational needs.</p></div>
      <div className="company-heading"><img src="/images/citi-logo.png" alt="Citi" /><div><h3>Citi</h3><p>Full-time · Chennai, India · {yearsAtCiti()}</p></div><span className="company-index">01 / 02</span></div>
      <div className="timeline">{experiences.map((item, index) => <ExperienceEntry item={item} key={item.id} index={index} />)}</div>
    </section>
    <section className="content-section section-wrap sacl-section"><div className="section-heading"><div><div className="section-kicker">SEPARATE INTERNSHIP</div><h2>INTERNSHIP <mark>SACL</mark></h2></div><p>A separate experience at Sakthi Auto Component Limited.</p></div><div className="timeline"><ExperienceEntry item={saclExperience} index={0} companyLogo="/images/sacl-logo.jfif" companyAlt="Sakthi Auto Component Limited" /></div></section>
    <section className="content-section section-wrap" id="projects"><div className="section-heading"><div><div className="section-kicker">04 <span>SELECTED WORK</span></div><h2>PROJECTS THAT <mark>ASK WHY</mark></h2></div><p>Research publications and hands-on personal builds.</p></div><h3 className="project-subheading">RESEARCH PROJECTS</h3><div className="project-grid">{projects.map((project, index) => <motion.article className="project-card" key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: index * 0.1 }}><div className="project-number">0{index + 1} <span>RESEARCH PAPER</span></div><h3>{project.title}</h3>{project.authors && <p className="project-authors">{project.authors}</p>}{project.summary && <p className="project-summary">{project.summary}</p>}<div className="project-footer"><span>{project.publication}</span><a href={project.url} target="_blank" rel="noreferrer">READ PAPER <ArrowUpRight size={16} /></a></div></motion.article>)}</div><h3 className="project-subheading personal-project-heading">PERSONAL PROJECTS</h3><div className="personal-project-grid">{personalProjects.map((project, index) => <article className="personal-project-card" key={project.title}><div className="project-number">0{index + 1} <span>PERSONAL PROJECT</span></div><h4>{project.title}</h4><p className="personal-project-summary">{project.summary}</p><div className="personal-project-details"><h5>PROJECT DETAILS</h5><ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div><div className="personal-project-stack"><h5>TECHNOLOGY STACK</h5>{project.tags.length > 0 ? <div className="personal-project-tags">{project.tags.map((tag) => <span className="project-stack-tag" key={tag}>{tag}</span>)}</div> : <p className="project-stack-empty">Not specified in the supplied project details.</p>}</div></article>)}</div></section>
    <section className="content-section section-wrap education-section" id="education"><div className="section-heading"><div><div className="section-kicker">05 <span>EDUCATION</span></div><h2>THE <mark>FOUNDATION</mark></h2></div></div><article className="education-card"><div className="university-mark">AU</div><div><p className="section-kicker">OCT 2020 — MAY 2024</p><h3>Anna University, Chennai</h3><p><strong>B.Tech in Information Technology</strong></p><p>Madras Institute of Technology (MIT Campus)</p><p className="education-honors">First Class with Distinction</p><p className="education-topics"><strong>Academic foundations</strong><br />OOPS, DBMS, Operating Systems, Cloud Computing, Big Data, and AI concepts</p><h4 className="course-heading">Selected coursework</h4><ul className="course-grid">{educationCourses.map(([code, title]) => <li key={code}><strong>{code}</strong><span>{title}</span></li>)}</ul><div className="education-highlights">{educationHighlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div></div><span className="education-label">UNDERGRADUATE</span></article></section>
  </>
}

function PersonalView({ onOpenImage }: { onOpenImage: (image: { src: string; alt: string }) => void }) {
  return <><section className="content-section section-wrap personal-intro" id="activities"><div className="section-heading"><div><div className="section-kicker">02 <span>BEYOND WORK</span></div><h2>THE <mark>OTHER SIDE</mark></h2></div><p>Extracurricular pursuits, creative work, and meaningful moments from school and university life.</p></div><p className="personal-note">From school parade and marchpast to creative and student-led experiences at university.</p></section>
    <section className="content-section section-wrap clubs-section" aria-label="Extracurricular experiences">{clubs.map((club, index) => <motion.article className="club-row" key={club.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: index * 0.06 }}><div className="club-meta"><div className="section-kicker">0{index + 1} / ACTIVITY</div><h3>{club.name}</h3><p>{club.theme}</p><p className="club-description">{club.description}</p>{club.highlights.length > 0 && <ul className="club-highlights">{club.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}</div><div className="club-gallery">{club.photos.map((photo, photoIndex) => <button className={`photo-tile photo-${photoIndex + 1} ${photo.fit === 'contain' ? 'photo-logo' : ''}`} type="button" key={photo.src} onClick={() => onOpenImage(photo)} aria-label={`Open photo: ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span>{club.name}</span></button>)}</div></motion.article>)}{campusActivities.map((activity) => <article className="club-row ncc-row" key={activity.name}><div className="club-meta"><div className="section-kicker">HIGH SCHOOL ACTIVITY</div><h3>{activity.name}</h3><p>{activity.theme}</p><p className="club-description">{activity.description}</p></div><div className="club-gallery">{activity.photos.map((photo) => <button className="photo-tile photo-logo" type="button" key={photo.src} onClick={() => onOpenImage(photo)} aria-label={`Open photo: ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span>{activity.name}</span></button>)}</div></article>)}</section>
  </>
}

export default App
