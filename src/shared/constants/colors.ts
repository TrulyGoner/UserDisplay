export const COLOR_BG           = '#1A1A1D';
export const COLOR_SURFACE      = '#252528';
export const COLOR_BORDER       = '#4E4E50';
export const COLOR_TEXT         = '#c9c9cc';
export const COLOR_TEXT_H       = '#f0f0f2';
export const COLOR_ACCENT       = '#C3073F';
export const COLOR_ACCENT_HOVER = '#950740';
export const COLOR_ACCENT_DIM   = '#6F2232';
export const COLOR_WHITE        = '#ffffff';
export const COLOR_MUTED        = '#aaaaaa';

export const COLOR_SUCCESS = '#22c55e';
export const COLOR_DANGER  = '#ef4444';

export const COLOR_ACCENT_ALPHA_08 = 'rgba(195, 7, 63, 0.08)';
export const COLOR_ACCENT_ALPHA_12 = 'rgba(195, 7, 63, 0.12)';
export const COLOR_ACCENT_ALPHA_15 = 'rgba(195, 7, 63, 0.15)';
export const COLOR_ACCENT_ALPHA_25 = 'rgba(195, 7, 63, 0.25)';
export const COLOR_ACCENT_ALPHA_30 = 'rgba(195, 7, 63, 0.3)';

export const COLOR_SHADOW_SM = 'rgba(0, 0, 0, 0.4)';
export const COLOR_SHADOW_MD = 'rgba(0, 0, 0, 0.55)';
export const COLOR_OVERLAY   = 'rgba(0, 0, 0, 0.65)';
export const COLOR_SHADOW_LG = 'rgba(0, 0, 0, 0.7)';

export const COLOR_SURFACE_ALPHA_30 = 'rgba(78, 78, 80, 0.3)';
export const COLOR_SURFACE_ALPHA_35 = 'rgba(78, 78, 80, 0.35)';

export const COLOR_MUTED_BG       = 'rgba(120, 120, 130, 0.15)';
export const COLOR_MUTED_BORDER   = 'rgba(120, 120, 130, 0.3)';
export const COLOR_SUCCESS_BG     = 'rgba(34, 197, 94, 0.12)';
export const COLOR_SUCCESS_BORDER = 'rgba(34, 197, 94, 0.35)';
export const COLOR_DANGER_BG      = 'rgba(239, 68, 68, 0.12)';
export const COLOR_DANGER_BORDER  = 'rgba(239, 68, 68, 0.35)';

export const COLOR_WHITE_ALPHA_06 = 'rgba(255, 255, 255, 0.06)';

const CSS_VARS: Record<string, string> = {
  '--bg':                COLOR_BG,
  '--surface':           COLOR_SURFACE,
  '--border':            COLOR_BORDER,
  '--text':              COLOR_TEXT,
  '--text-h':            COLOR_TEXT_H,
  '--accent':            COLOR_ACCENT,
  '--accent-hover':      COLOR_ACCENT_HOVER,
  '--accent-dim':        COLOR_ACCENT_DIM,
  '--white':             COLOR_WHITE,
  '--muted':             COLOR_MUTED,
  '--success':           COLOR_SUCCESS,
  '--danger':            COLOR_DANGER,
  '--accent-alpha-08':   COLOR_ACCENT_ALPHA_08,
  '--accent-alpha-12':   COLOR_ACCENT_ALPHA_12,
  '--accent-alpha-15':   COLOR_ACCENT_ALPHA_15,
  '--accent-alpha-25':   COLOR_ACCENT_ALPHA_25,
  '--accent-alpha-30':   COLOR_ACCENT_ALPHA_30,
  '--shadow-sm':         COLOR_SHADOW_SM,
  '--shadow-md':         COLOR_SHADOW_MD,
  '--overlay':           COLOR_OVERLAY,
  '--shadow-lg':         COLOR_SHADOW_LG,
  '--surface-alpha-30':  COLOR_SURFACE_ALPHA_30,
  '--surface-alpha-35':  COLOR_SURFACE_ALPHA_35,
  '--muted-bg':          COLOR_MUTED_BG,
  '--muted-border':      COLOR_MUTED_BORDER,
  '--success-bg':        COLOR_SUCCESS_BG,
  '--success-border':    COLOR_SUCCESS_BORDER,
  '--danger-bg':         COLOR_DANGER_BG,
  '--danger-border':     COLOR_DANGER_BORDER,
  '--white-alpha-06':    COLOR_WHITE_ALPHA_06,
};

export function applyColors(): void {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(CSS_VARS)) {
    root.style.setProperty(name, value);
  }
}

