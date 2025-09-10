/**
 * Animation System
 * 
 * Animation helpers, transition utilities, and motion design tokens
 */

import { Theme } from './theme'

export interface AnimationConfig {
  duration: string
  easing: string
  delay?: string
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  iterationCount?: number | 'infinite'
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  playState?: 'running' | 'paused'
}

export interface TransitionConfig {
  property: string | string[]
  duration: string
  easing: string
  delay?: string
}

export interface KeyframeStep {
  offset: number // 0 to 1
  styles: React.CSSProperties
  easing?: string
}

export interface AnimationStyles extends React.CSSProperties {
  ':hover'?: React.CSSProperties
  ':focus'?: React.CSSProperties
  ':active'?: React.CSSProperties
  ':disabled'?: React.CSSProperties
}

/**
 * Easing Functions
 */
export const easingFunctions = {
  // Standard easing
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Cubic bezier presets
  easeInSine: 'cubic-bezier(0.12, 0, 0.39, 0)',
  easeOutSine: 'cubic-bezier(0.61, 1, 0.88, 1)',
  easeInOutSine: 'cubic-bezier(0.37, 0, 0.63, 1)',
  
  easeInQuad: 'cubic-bezier(0.11, 0, 0.5, 0)',
  easeOutQuad: 'cubic-bezier(0.5, 1, 0.89, 1)',
  easeInOutQuad: 'cubic-bezier(0.45, 0, 0.55, 1)',
  
  easeInCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
  easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
  
  easeInQuart: 'cubic-bezier(0.5, 0, 0.75, 0)',
  easeOutQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  easeInOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  
  easeInQuint: 'cubic-bezier(0.64, 0, 0.78, 0)',
  easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeInOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',
  
  easeInExpo: 'cubic-bezier(0.7, 0, 0.84, 0)',
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',
  
  easeInCirc: 'cubic-bezier(0.55, 0, 1, 0.45)',
  easeOutCirc: 'cubic-bezier(0, 0.55, 0.45, 1)',
  easeInOutCirc: 'cubic-bezier(0.85, 0, 0.15, 1)',
  
  easeInBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  easeInOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  
  // Spring-like easing
  bounceOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  bounceIn: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  bounceInOut: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
} as const

/**
 * Duration Tokens
 */
export const durations = {
  instant: '0ms',
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  slower: '500ms',
  slowest: '750ms',
} as const

/**
 * Animation Presets
 */
export const animationPresets = {
  // Fade animations
  fadeIn: {
    duration: durations.normal,
    easing: easingFunctions.easeOut,
    fillMode: 'both' as const,
  },
  fadeOut: {
    duration: durations.normal,
    easing: easingFunctions.easeIn,
    fillMode: 'both' as const,
  },
  
  // Scale animations
  scaleIn: {
    duration: durations.normal,
    easing: easingFunctions.easeOutBack,
    fillMode: 'both' as const,
  },
  scaleOut: {
    duration: durations.fast,
    easing: easingFunctions.easeInBack,
    fillMode: 'both' as const,
  },
  
  // Slide animations
  slideInUp: {
    duration: durations.normal,
    easing: easingFunctions.easeOutCubic,
    fillMode: 'both' as const,
  },
  slideInDown: {
    duration: durations.normal,
    easing: easingFunctions.easeOutCubic,
    fillMode: 'both' as const,
  },
  slideInLeft: {
    duration: durations.normal,
    easing: easingFunctions.easeOutCubic,
    fillMode: 'both' as const,
  },
  slideInRight: {
    duration: durations.normal,
    easing: easingFunctions.easeOutCubic,
    fillMode: 'both' as const,
  },
  
  // Bounce animations
  bounce: {
    duration: durations.slower,
    easing: easingFunctions.bounceOut,
    fillMode: 'both' as const,
  },
  
  // Pulse animation
  pulse: {
    duration: durations.slower,
    easing: easingFunctions.easeInOutQuad,
    iterationCount: 'infinite' as const,
    direction: 'alternate' as const,
  },
  
  // Spin animation
  spin: {
    duration: '1s',
    easing: easingFunctions.linear,
    iterationCount: 'infinite' as const,
  },
} as const

/**
 * Keyframe Generator
 */
export class KeyframeGenerator {
  static fadeIn(): KeyframeStep[] {
    return [
      { offset: 0, styles: { opacity: 0 } },
      { offset: 1, styles: { opacity: 1 } }
    ]
  }

  static fadeOut(): KeyframeStep[] {
    return [
      { offset: 0, styles: { opacity: 1 } },
      { offset: 1, styles: { opacity: 0 } }
    ]
  }

  static scaleIn(): KeyframeStep[] {
    return [
      { offset: 0, styles: { transform: 'scale(0)', opacity: 0 } },
      { offset: 1, styles: { transform: 'scale(1)', opacity: 1 } }
    ]
  }

  static scaleOut(): KeyframeStep[] {
    return [
      { offset: 0, styles: { transform: 'scale(1)', opacity: 1 } },
      { offset: 1, styles: { transform: 'scale(0)', opacity: 0 } }
    ]
  }

  static slideInUp(): KeyframeStep[] {
    return [
      { offset: 0, styles: { transform: 'translateY(100%)', opacity: 0 } },
      { offset: 1, styles: { transform: 'translateY(0)', opacity: 1 } }
    ]
  }

  static slideInDown(): KeyframeStep[] {
    return [
      { offset: 0, styles: { transform: 'translateY(-100%)', opacity: 0 } },
      { offset: 1, styles: { transform: 'translateY(0)', opacity: 1 } }
    ]
  }

  static slideInLeft(): KeyframeStep[] {
    return [
      { offset: 0, styles: { transform: 'translateX(-100%)', opacity: 0 } },
      { offset: 1, styles: { transform: 'translateX(0)', opacity: 1 } }
    ]
  }

  static slideInRight(): KeyframeStep[] {
    return [
      { offset: 0, styles: { transform: 'translateX(100%)', opacity: 0 } },
      { offset: 1, styles: { transform: 'translateX(0)', opacity: 1 } }
    ]
  }

  static bounce(): KeyframeStep[] {
    return [
      { offset: 0, styles: { transform: 'translateY(-45px)', animationTimingFunction: easingFunctions.easeIn } },
      { offset: 0.24, styles: { transform: 'translateY(0)', animationTimingFunction: easingFunctions.easeOut } },
      { offset: 0.40, styles: { transform: 'translateY(-20px)', animationTimingFunction: easingFunctions.easeIn } },
      { offset: 0.65, styles: { transform: 'translateY(0)', animationTimingFunction: easingFunctions.easeOut } },
      { offset: 0.82, styles: { transform: 'translateY(-10px)', animationTimingFunction: easingFunctions.easeIn } },
      { offset: 1, styles: { transform: 'translateY(0)', animationTimingFunction: easingFunctions.easeOut } }
    ]
  }

  static pulse(): KeyframeStep[] {
    return [
      { offset: 0, styles: { transform: 'scale(1)' } },
      { offset: 0.5, styles: { transform: 'scale(1.05)' } },
      { offset: 1, styles: { transform: 'scale(1)' } }
    ]
  }

  static spin(): KeyframeStep[] {
    return [
      { offset: 0, styles: { transform: 'rotate(0deg)' } },
      { offset: 1, styles: { transform: 'rotate(360deg)' } }
    ]
  }

  static custom(steps: KeyframeStep[]): KeyframeStep[] {
    return steps.sort((a, b) => a.offset - b.offset)
  }
}

/**
 * Animation Builder
 */
export class AnimationBuilder {
  private config: Partial<AnimationConfig> = {}
  private animationKeyframes: KeyframeStep[] = []

  duration(duration: string | keyof typeof durations): this {
    this.config.duration = typeof duration === 'string' ? duration : durations[duration]
    return this
  }

  easing(easing: string | keyof typeof easingFunctions): this {
    this.config.easing = typeof easing === 'string' ? easing : easingFunctions[easing]
    return this
  }

  delay(delay: string): this {
    this.config.delay = delay
    return this
  }

  fillMode(fillMode: AnimationConfig['fillMode']): this {
    this.config.fillMode = fillMode
    return this
  }

  iterationCount(count: number | 'infinite'): this {
    this.config.iterationCount = count
    return this
  }

  direction(direction: AnimationConfig['direction']): this {
    this.config.direction = direction
    return this
  }

  keyframes(keyframes: KeyframeStep[]): this {
    this.animationKeyframes = keyframes
    return this
  }

  preset(preset: keyof typeof animationPresets): this {
    const presetConfig = animationPresets[preset]
    this.config = { ...this.config, ...presetConfig }
    
    // Set keyframes based on preset
    switch (preset) {
      case 'fadeIn':
        this.animationKeyframes = KeyframeGenerator.fadeIn()
        break
      case 'fadeOut':
        this.animationKeyframes = KeyframeGenerator.fadeOut()
        break
      case 'scaleIn':
        this.animationKeyframes = KeyframeGenerator.scaleIn()
        break
      case 'scaleOut':
        this.animationKeyframes = KeyframeGenerator.scaleOut()
        break
      case 'slideInUp':
        this.animationKeyframes = KeyframeGenerator.slideInUp()
        break
      case 'slideInDown':
        this.animationKeyframes = KeyframeGenerator.slideInDown()
        break
      case 'slideInLeft':
        this.animationKeyframes = KeyframeGenerator.slideInLeft()
        break
      case 'slideInRight':
        this.animationKeyframes = KeyframeGenerator.slideInRight()
        break
      case 'bounce':
        this.animationKeyframes = KeyframeGenerator.bounce()
        break
      case 'pulse':
        this.animationKeyframes = KeyframeGenerator.pulse()
        break
      case 'spin':
        this.animationKeyframes = KeyframeGenerator.spin()
        break
    }
    
    return this
  }

  build(): {
    keyframes: KeyframeStep[]
    config: AnimationConfig
    cssKeyframes: string
    animationStyle: React.CSSProperties
  } {
    const config: AnimationConfig = {
      duration: this.config.duration || durations.normal,
      easing: this.config.easing || easingFunctions.ease,
      delay: this.config.delay,
      fillMode: this.config.fillMode,
      iterationCount: this.config.iterationCount,
      direction: this.config.direction,
      playState: this.config.playState
    }

    const cssKeyframes = this.generateCSSKeyframes()
    const animationStyle = this.generateAnimationStyle(config)

    return {
      keyframes: this.animationKeyframes,
      config,
      cssKeyframes,
      animationStyle
    }
  }

  private generateCSSKeyframes(): string {
    const keyframeRules = this.animationKeyframes.map(step => {
      const percentage = Math.round(step.offset * 100)
      const styles = Object.entries(step.styles)
        .map(([prop, value]) => `${this.kebabCase(prop)}: ${value}`)
        .join('; ')
      
      return `${percentage}% { ${styles} }`
    }).join('\n  ')

    return `@keyframes animation {\n  ${keyframeRules}\n}`
  }

  private generateAnimationStyle(config: AnimationConfig): React.CSSProperties {
    const animationValue = [
      'animation', // keyframe name will be set externally
      config.duration,
      config.easing,
      config.delay || '0s',
      config.iterationCount || 1,
      config.direction || 'normal',
      config.fillMode || 'none',
      config.playState || 'running'
    ].filter(v => v !== undefined).join(' ')

    return {
      animation: animationValue
    }
  }

  private kebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
  }
}

/**
 * Transition Builder
 */
export class TransitionBuilder {
  private transitions: TransitionConfig[] = []

  property(property: string | string[]): this {
    const props = Array.isArray(property) ? property : [property]
    props.forEach(prop => {
      this.transitions.push({
        property: prop,
        duration: durations.normal,
        easing: easingFunctions.ease
      })
    })
    return this
  }

  duration(duration: string | keyof typeof durations): this {
    const durationValue = typeof duration === 'string' ? duration : durations[duration]
    this.transitions.forEach(t => t.duration = durationValue)
    return this
  }

  easing(easing: string | keyof typeof easingFunctions): this {
    const easingValue = typeof easing === 'string' ? easing : easingFunctions[easing]
    this.transitions.forEach(t => t.easing = easingValue)
    return this
  }

  delay(delay: string): this {
    this.transitions.forEach(t => t.delay = delay)
    return this
  }

  all(duration?: string | keyof typeof durations, easing?: string | keyof typeof easingFunctions): this {
    const durationValue = duration ? (typeof duration === 'string' ? duration : durations[duration]) : durations.normal
    const easingValue = easing ? (typeof easing === 'string' ? easing : easingFunctions[easing]) : easingFunctions.ease
    
    this.transitions = [{
      property: 'all',
      duration: durationValue,
      easing: easingValue
    }]
    return this
  }

  build(): React.CSSProperties {
    const transitionValue = this.transitions
      .map(t => `${t.property} ${t.duration} ${t.easing}${t.delay ? ` ${t.delay}` : ''}`)
      .join(', ')

    return {
      transition: transitionValue
    }
  }
}

/**
 * Motion Design System
 */
export class MotionSystem {
  public durations = durations
  public easing = easingFunctions
  public presets = animationPresets
  
  constructor(private theme: Theme) {}

  /**
   * Create animation builder
   */
  animate(): AnimationBuilder {
    return new AnimationBuilder()
  }

  /**
   * Create transition builder
   */
  transition(): TransitionBuilder {
    return new TransitionBuilder()
  }

  /**
   * Quick transition helpers
   */
  quickTransition(
    property: string | string[] = 'all',
    duration: keyof typeof durations = 'normal',
    easing: keyof typeof easingFunctions = 'ease'
  ): React.CSSProperties {
    return new TransitionBuilder()
      .property(property)
      .duration(duration)
      .easing(easing)
      .build()
  }

  /**
   * Hover effect helpers
   */
  hoverScale(scale: number = 1.05): AnimationStyles {
    return {
      ...this.quickTransition('transform'),
      ':hover': {
        transform: `scale(${scale})`
      }
    }
  }

  hoverLift(translateY: string = '-2px'): AnimationStyles {
    return {
      ...this.quickTransition(['transform', 'box-shadow']),
      ':hover': {
        transform: `translateY(${translateY})`,
        boxShadow: this.theme.shadows.lg
      }
    }
  }

  hoverFade(opacity: number = 0.8): AnimationStyles {
    return {
      ...this.quickTransition('opacity'),
      ':hover': {
        opacity
      }
    }
  }

  /**
   * Focus effect helpers
   */
  focusRing(color?: string): AnimationStyles {
    return {
      outline: 'none',
      ...this.quickTransition(['box-shadow', 'border-color']),
      ':focus': {
        borderColor: color || this.theme.colors.primary,
        boxShadow: `0 0 0 3px ${color || this.theme.colors.primary}20`
      }
    }
  }

  /**
   * Loading state helpers
   */
  loadingPulse(): React.CSSProperties {
    const animation = this.animate()
      .preset('pulse')
      .build()
    
    return animation.animationStyle
  }

  loadingSpin(): React.CSSProperties {
    const animation = this.animate()
      .preset('spin')
      .build()
    
    return animation.animationStyle
  }

  /**
   * Enter/exit animation helpers
   */
  enterAnimation(type: 'fade' | 'scale' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' = 'fade'): React.CSSProperties {
    const presetMap = {
      fade: 'fadeIn',
      scale: 'scaleIn',
      slideUp: 'slideInUp',
      slideDown: 'slideInDown',
      slideLeft: 'slideInLeft',
      slideRight: 'slideInRight'
    } as const

    const animation = this.animate()
      .preset(presetMap[type])
      .build()
    
    return animation.animationStyle
  }

  exitAnimation(type: 'fade' | 'scale' = 'fade'): React.CSSProperties {
    const presetMap = {
      fade: 'fadeOut',
      scale: 'scaleOut'
    } as const

    const animation = this.animate()
      .preset(presetMap[type])
      .build()
    
    return animation.animationStyle
  }
}

/**
 * Animation Hook Factory
 */
export function createAnimationHooks(theme: Theme) {
  const motionSystem = new MotionSystem(theme)

  function useAnimation() {
    return motionSystem
  }

  function useTransition(
    property: string | string[] = 'all',
    duration: keyof typeof durations = 'normal',
    easing: keyof typeof easingFunctions = 'ease'
  ) {
    return motionSystem.quickTransition(property, duration, easing)
  }

  function useHoverEffects() {
    return {
      scale: motionSystem.hoverScale,
      lift: motionSystem.hoverLift,
      fade: motionSystem.hoverFade
    }
  }

  return {
    useAnimation,
    useTransition,
    useHoverEffects,
    motionSystem
  }
}
