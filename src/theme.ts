const primaryColor = '#008FF7'

export type themesOptions = 'light'|'dark'

export const light = {
  name: 'light' as themesOptions,
  primaryColor,
  primaryText: '#FFFFFF',
  primaryBackground: primaryColor,
  primaryHoverBackground: '#0066CC',
  disabledBackground: '#EFEFEF',
  disabledText: '#CCCCCC',

  h1: '#F2F2F2', // modal-deader
  h2: primaryColor,
  h3: '#6C6B6C',
  p: '#B0AEB1', // p
  link: primaryColor,
  linkHover: '#4386c6',

  overlay: 'rgba(0, 0, 0, 0.4)', // ModalLightbox
  error: '#EDB21C',
  containerBackground: '#F2F2F2',
  containerBackgroundHover: '#E4E4E4',

  secondaryBackground: '#F2F2F2', // Network
  secondaryHoverBackground: '#E4E4E4',
  secondaryText: '#6C6B6C',
  modalBackground: '#FFFFFF',

  closeButton: '#A19191',
  loadingText: '#999999',
  testnetText: '#AAAAAA'
}

export type ThemeType = typeof light;

export const dark: ThemeType = {
  name: 'dark' as themesOptions,
  primaryColor,
  primaryText: '#000000',
  primaryBackground: primaryColor,
  primaryHoverBackground: '#0066CC',
  disabledBackground: '#EFEFEF',
  disabledText: '#CCCCCC',

  h1: '#1a1a1a', // modal-deader
  h2: primaryColor,
  h3: '#6C6B6C',
  p: '#B0AEB1', // p
  link: primaryColor,
  linkHover: '#4386c6',

  overlay: 'rgba(0, 0, 0, 0.4)', // ModalLightbox
  error: '#EDB21C',
  containerBackground: '#1a1a1a',
  containerBackgroundHover: '#222222',

  secondaryBackground: '#1a1a1a', // Network
  secondaryHoverBackground: '#222222',
  secondaryText: '#6C6B6C',
  modalBackground: '#000000',

  closeButton: '#A19191',
  loadingText: '#444444',
  testnetText: '#333333'
}

export const themes = {
  light,
  dark
}

export const defaultTheme = 'light'
