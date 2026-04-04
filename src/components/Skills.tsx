import './Skills.css'

const skillGroups = [
  {
    title: 'DESIGN TOOLS',
    items: ['Figma', 'FigJam', 'Prototyping', 'Auto Layout'],
  },
  {
    title: 'DESIGN SKILLS',
    items: [
      'UI Design',
      'Visual Hierarchy',
      'User Flow Design',
      'Typography',
      'Component Design',
      'Mobile UI',
      'Web UI',
      'Layout & Spacing',
    ],
  },
  {
    title: 'DEVELOPMENT',
    items: [
      'HTML / CSS',
      'Javascript',
      'Typescript',
      'React / Preact',
      'Vite',
      'Responsive Design',
    ],
  },
  {
    title: 'SOFT SKILLS',
    items: [
      'Attention to Detail',
      'Problem Solving',
      'Business Thinking',
      'Self-directed Learning',
    ],
  },
]

export function Skills() {
  return (
    <section class="skills" id="skills">
      <div class="skills__inner container">
        <div class="skills__header">
          <span class="skills__badge">Skills</span>
          <h2 class="skills__title">What I work with.</h2>
        </div>

        <div class="skills__grid">
          {skillGroups.map((group) => (
            <div class="skills__card">
              <span class="skills__card-title">{group.title}</span>
              <div class="skills__card-tags">
                {group.items.map((item) => (
                  <span class="skills__tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
