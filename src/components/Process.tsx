import './Process.css'

const steps = [
  {
    num: '01',
    title: 'Understand',
    desc: 'What does the user actually need here? Before opening Figma, I try to feel the friction — where does the flow break.',
  },
  {
    num: '02',
    title: 'Simplify',
    desc: "What's the fastest way to give it to them? Every extra click, every ambiguous label, every unnecessary element — out.",
  },
  {
    num: '03',
    title: 'Refine',
    desc: "What can I remove without losing meaning? Good design is obvious in hindsight. I keep going until the interface disappears.",
  },
]

export function Process() {
  return (
    <section class="process" id="process">
      <div class="process__inner container">
        <div class="process__grid">
          {steps.map((step) => (
            <div class="process__card">
              <span class="process__card-num">{step.num}</span>
              <h3 class="process__card-title">{step.title}</h3>
              <p class="process__card-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <blockquote class="process__quote">
          "Clean Design Isn't About Making Things Pretty — It's About Making Things Obvious."
        </blockquote>
      </div>
    </section>
  )
}
