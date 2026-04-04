import './Marquee.css'

const skills = [
  'UI Design',
  'Visual Hierarchy',
  'User Flow',
  'Figma',
  'Mobile UI',
  'Web Design',
  'Component Design',
  'Clean Aesthetics',
]

export function Marquee() {
  const items = [...skills, ...skills, ...skills]

  return (
    <div class="marquee">
      <div class="marquee__track">
        {items.map((skill) => (
          <span class="marquee__item">
            <span class="marquee__text">{skill}</span>
            <span class="marquee__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
