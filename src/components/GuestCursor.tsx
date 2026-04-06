export const GuestCursor = ({ x, y, isPointer }: { x: number; y: number; isPointer: boolean }) => {
  return (
    <div 
      style={{
        position: 'fixed', // Use fixed to stay relative to the viewport
        top: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        pointerEvents: 'none',
        transform: `translate3d(${x}px, ${y}px, 0)`,
        transition: 'transform 0.06s ease-out, opacity 0.3s ease',
        opacity: x === 0 && y === 0 ? 0 : 1,
      }}
    >
      <svg 
        width="22" 
        height="22" 
        viewBox="0 0 24 24" 
        fill="none"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
          transform: isPointer ? 'scale(0.9) rotate(-5deg)' : 'scale(1)',
          transition: 'transform 0.2s ease'
        }}
      >
        <path 
          d="M5.5 3.5L5.5 21.0C5.5 21.4 6.0 21.6 6.3 21.3L11.5 16.0L18.0 16.0C18.4 16.0 18.6 15.5 18.3 15.2L5.8 3.2C5.5 2.9 5.0 3.1 5.0 3.5L5.5 3.5Z" 
          fill="white" 
          stroke="black" 
          stroke-width="1.5" 
          stroke-linejoin="round"
        />
      </svg>
      <div style={{
        background: '#C0513F',
        color: 'white',
        fontSize: '0.6rem',
        fontWeight: 600,
        padding: '0.2rem 0.5rem',
        borderRadius: '3px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        whiteSpace: 'nowrap',
        marginLeft: '14px',
        marginTop: '-6px',
        transform: isPointer ? 'translateY(2px)' : 'translateY(0)',
        transition: 'all 0.2s ease'
      }}>
        Guest
      </div>
    </div>
  )
}
