declare module 'vanta/dist/vanta.globe.min' {
  interface VantaGlobeOptions {
    el: HTMLElement | null
    THREE: typeof import('three')
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    scaleMobile?: number
    color?: number
    color2?: number
    backgroundColor?: number
  }

  interface VantaEffect {
    destroy: () => void
    resize: () => void
    setOptions: (options: Partial<VantaGlobeOptions>) => void
  }

  export default function VANTA_GLOBE(options: VantaGlobeOptions): VantaEffect
}

declare module 'vanta/dist/vanta.dots.min' {
  interface VantaDotsOptions {
    el: HTMLElement | null
    THREE: typeof import('three')
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    scaleMobile?: number
    color?: number
    color2?: number
    backgroundColor?: number
    size?: number
    spacing?: number
    showLines?: boolean
  }

  interface VantaEffect {
    destroy: () => void
    resize: () => void
    setOptions: (options: Partial<VantaDotsOptions>) => void
  }

  export default function VANTA_DOTS(options: VantaDotsOptions): VantaEffect
}

declare module 'vanta/dist/vanta.waves.min' {
  interface VantaWavesOptions {
    el: HTMLElement | null
    THREE: typeof import('three')
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    scale?: number
    scaleMobile?: number
    color?: number
    shininess?: number
    waveHeight?: number
    waveSpeed?: number
    zoom?: number
  }

  interface VantaEffect {
    destroy: () => void
    resize: () => void
    setOptions: (options: Partial<VantaWavesOptions>) => void
  }

  export default function VANTA_WAVES(options: VantaWavesOptions): VantaEffect
}

