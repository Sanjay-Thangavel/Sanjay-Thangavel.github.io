import {
  siBootstrap, siCplusplus, siCss3, siDatabricks, siDocker, siFastapi, siFlask, siGit,
  siGnubash, siGooglecloud, siHtml5, siJenkins, siKeras, siKubernetes, siLangchain,
  siMongodb, siMysql, siNextdotjs, siNodedotjs, siOpenjdk, siOracle, siPostgresql,
  siJavascript, siPytorch, siPython, siReact, siScikitlearn, siSnowflake, siSqlite, siTableau,
  siTekton, siTensorflow, siTypescript, siVuedotjs,
} from 'simple-icons'
import { foundations, techGroups } from '../data/portfolio'

const iconMap: Record<string, { path: string }> = {
  siBootstrap, siCplusplus, siCss3, siDatabricks, siDocker, siFastapi, siFlask, siGit,
  siGnubash, siGooglecloud, siHtml5, siJenkins, siKeras, siKubernetes, siLangchain,
  siMongodb, siMysql, siNextdotjs, siNodedotjs, siOpenjdk, siOracle, siPostgresql,
  siJavascript, siPytorch, siPython, siReact, siScikitlearn, siSnowflake, siSqlite, siTableau,
  siTekton, siTensorflow, siTypescript, siVuedotjs,
}

export function TechIcon({ name }: { name: string }) {
  const aliases: Record<string, string> = {
    'C/C++': 'siCplusplus', Java: 'siOpenjdk', Bash: 'siGnubash', 'Node.js': 'siNodedotjs',
    'Vue.js': 'siVuedotjs', 'Next.js': 'siNextdotjs', 'Oracle SQL': 'siOracle',
    JavaScript: 'siJavascript', TypeScript: 'siTypescript', FastAPI: 'siFastapi', LangChain: 'siLangchain',
    'Scikit-Learn': 'siScikitlearn', HTML5: 'siHtml5', CSS3: 'siCss3', MySQL: 'siMysql',
    PostgreSQL: 'siPostgresql', SQLite: 'siSqlite', MongoDB: 'siMongodb', GCP: 'siGooglecloud',
    TensorFlow: 'siTensorflow', PyTorch: 'siPytorch', 'C#': '', AWS: '', Azure: '', MCP: '',
    RAG: '', LangGraph: '', Harness: '', OpenShift: '', 'Amazon EKS': '',
  }
  const key = aliases[name] ?? `si${name.replace(/[^a-zA-Z0-9]/g, '')}`
  const icon = iconMap[key]
  const shortName = name.split(/[ ./-]/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  return <span className="tech-mark" aria-hidden="true">{icon ? <svg viewBox="0 0 24 24"><path d={icon.path} /></svg> : <span>{shortName}</span>}</span>
}

export function TechStack() {
  return <section className="content-section section-wrap skills-section" id="skills">
    <div className="section-heading"><div><div className="section-kicker">02 <span>TOOLKIT</span></div><h2>SKILLS & <mark>FOUNDATIONS</mark></h2></div><p>A broad, practical stack across software, data systems, machine learning, and cloud platforms.</p></div>
    <div className="tech-grid">{techGroups.map((group, index) => <article className="tech-category" key={group.category}><div className="tech-category-heading"><span className="tech-category-index">0{index + 1}</span><h3>{group.category}</h3><span className="tech-count">{group.items.length} SKILLS</span></div><div className="tech-items">{group.items.map(([name]) => <div className="tech-item" key={name} title={name}><TechIcon name={name} /><span>{name}</span></div>)}</div></article>)}</div>
    <article className="foundations-panel"><div><span className="section-kicker">CORE KNOWLEDGE</span><h3>Engineering foundations</h3><p>Concepts developed through undergraduate study and hands-on data work.</p></div><div className="foundation-items">{foundations.map((item) => <span className="foundation-item" key={item}><span aria-hidden="true">+</span>{item}</span>)}</div></article>
  </section>
}