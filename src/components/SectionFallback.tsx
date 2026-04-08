import { theme } from '../theme'

export const SectionFallback = () => (
  <div style={{
    width: '100%',
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    opacity: 0,
    animation: 'skeletonFadeIn 0.5s ease forwards 0.2s',
  }}>
    <style>{`
      @keyframes skeletonFadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .skeleton-block {
        border-radius: 12px;
        background: linear-gradient(90deg, #F0ECE8 25%, #F7F3F0 50%, #F0ECE8 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite linear;
      }
    `}</style>
    
    {/* Mimicking Section Header */}
    <div className="skeleton-block" style={{ width: '120px', height: '32px', borderRadius: '100px', marginBottom: '8px' }} />
    
    {/* Mimicking Large Title */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="skeleton-block" style={{ width: 'clamp(200px, 60%, 400px)', height: 'clamp(32px, 5vw, 48px)' }} />
      <div className="skeleton-block" style={{ width: 'clamp(150px, 45%, 300px)', height: 'clamp(32px, 5vw, 48px)' }} />
    </div>

    {/* Mimicking Content Grid/Card */}
    <div className="skeleton-block" style={{ 
      width: '100%', 
      height: '350px', 
      marginTop: '20px',
      borderRadius: '24px',
      border: '1px solid rgba(240, 236, 232, 0.6)'
    }} />
  </div>
)
