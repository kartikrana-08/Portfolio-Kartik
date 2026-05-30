import { useEffect } from 'preact/hooks'

interface Props {
  src: string
  alt: string
  onClose: () => void
}

// Global helper to open the lightbox from anywhere in the codebase
export function openLightbox(src: string, alt: string) {
  const event = new CustomEvent('open-lightbox', { detail: { src, alt } })
  window.dispatchEvent(event)
}

export function ImageLightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    // Prevent body scroll while open
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const isWebsite = src.includes('screen-8') || alt.toLowerCase().includes('website')

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(6, 3, 16, 0.95)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'lbFadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lbScaleIn {
          from { transform: scale(0.86); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .lb-close-btn:hover {
          background: rgba(255,255,255,0.18) !important;
          transform: scale(1.08);
        }
        .custom-scrollbar-container::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar-container::-webkit-scrollbar-track {
          background: #0B0816;
        }
        .custom-scrollbar-container::-webkit-scrollbar-thumb {
          background: rgba(200, 85, 61, 0.45);
          border-radius: 4px;
        }
        .custom-scrollbar-container::-webkit-scrollbar-thumb:hover {
          background: rgba(200, 85, 61, 0.7);
        }
      `}</style>

      {/* Close button */}
      <button
        className="lb-close-btn"
        onClick={(e: any) => { e.stopPropagation(); onClose() }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          color: 'rgba(255,255,255,0.88)',
          fontSize: '1.1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          zIndex: 100000,
          lineHeight: 1,
          fontFamily: 'inherit',
        }}
      >
        ✕
      </button>

      {isWebsite ? (
        /* Scrollable Desktop Browser Mockup for Long Screenshot */
        <div
          onClick={(e: any) => e.stopPropagation()}
          style={{
            animation: 'lbScaleIn 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'flex',
            flexDirection: 'column',
            width: '90vw',
            maxWidth: '1200px',
            height: '80vh',
            background: '#0B0816',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08)',
            border: '1px solid rgba(200, 85, 61, 0.25)',
          }}
        >
          {/* Browser address bar */}
          <div style={{
            width: '100%',
            background: 'linear-gradient(135deg, #100726 0%, #2e1266 50%, #100726 100%)',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            userSelect: 'none',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((color, i) => (
                <span key={i} style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: color,
                  display: 'block',
                }} />
              ))}
            </div>
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '10px',
              padding: '6px 16px',
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center' as const,
              letterSpacing: '0.04em',
              fontFamily: 'Inter, sans-serif',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}>
              <span style={{ color: '#9B6FE5' }}>🔒</span>
              <span>virtuallibrary.in/case-study-preview</span>
            </div>
          </div>

          {/* Scrollable Viewport */}
          <div
            className="custom-scrollbar-container"
            style={{
              width: '100%',
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              background: '#0a0712',
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                imageRendering: 'auto',
              }}
            />
          </div>

          {/* Caption bar inside the mockup footer */}
          <div style={{
            padding: '12px 20px',
            background: 'rgba(255,255,255,0.02)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            fontFamily: 'Inter, sans-serif',
          }}>
            <span>{alt} (Scroll to explore)</span>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>
              Press <kbd style={{ background: 'rgba(255,255,255,0.05)', padding: '1px 5px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.1)' }}>ESC</kbd> or click outside to close
            </span>
          </div>
        </div>
      ) : (
        /* Standard Phone Mockup Container */
        <div
          onClick={(e: any) => e.stopPropagation()}
          style={{
            animation: 'lbScaleIn 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px',
            maxWidth: '100%',
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '86vw',
              maxHeight: '84vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '20px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.07)',
              display: 'block',
            }}
          />

          {/* Caption */}
          <div style={{
            color: 'rgba(255,255,255,0.38)',
            fontSize: '0.78rem',
            letterSpacing: '0.06em',
            textAlign: 'center' as const,
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span>{alt}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>
              Click outside or press{' '}
              <kbd style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '4px',
                padding: '1px 7px',
                border: '1px solid rgba(255,255,255,0.14)',
                fontSize: '0.72rem',
                fontFamily: 'inherit',
              }}>ESC</kbd>
              {' '}to close
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
