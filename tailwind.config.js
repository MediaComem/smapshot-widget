module.exports = {
  prefix: '',
  important: false,
  purge: {
    preserveHtmlElements: false,
    content: ['./src/**/*.vue'],
    options: {
      safelist: {
        standard: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/
        ],
        deep: [/ol-/, /cesium/, /vld-overlay/, /focus-visible/, /popover/, /tooltip/, /el-/]
      },
    }
  },
  separator: ':',
  theme: {
    slider: {
      desktop: {
        height: '185px' // Use px or change 'centerMap' function in layouts/Dashboard
      },
      mobile: {
        height: '160px' // Use px or change 'centerMap' function in layouts/Dashboard
      }
    },

    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },

    colors: {
      transparent: 'transparent',

      black: '#000000',
      white: '#ffffff',

      gray: {
        50: '#F2F2F2', // Disabled state
        100: '#E2E2E2',
        150: '#B3B3B3',
        200: '#9F9F9F',
        300: '#767676',
        400: '#444444',
        500: '#1F1F1F'
      },

      // 2 Main colors

      teal: {
        50: '#aeeaec',
        60: '#a0ffff',
        70: '#8cffff',
        80: '#78fcff',
        90: '#64e8ed',
        100: '#50d4d9',
        200: '#3cc0c5',
        300: '#28acb1',
        400: '#14989d',
        // From 500-900: Accessible AA on white
        500: '#008489',
        600: '#007075',
        700: '#005c61',
        800: '#00484d'
      },

      orange: {
        50: '#ffba9d',
        60: '#ffdaa0',
        70: '#ffc68c',
        80: '#ffb278',
        90: '#ff9e64',
        100: '#ff8a50',
        200: '#ff763c',
        300: '#ff6228',
        400: '#ef4e14',
        // From 500-900: Accessible AA on white
        500: '#DB3A00',
        600: '#c72600',
        700: '#b31200',
        800: '#9f0000'
      },

      // Geolocalise: selection

      yellow: {
        100: '#ffff7f',
        200: '#ffff6b',
        300: '#fdfa57',
        400: '#e9e643',
        500: '#d5d22f'
      },

      red: {
        50: '#fff1f1',
        100: '#ff8d8d',
        200: '#ff7979',
        300: '#f56565',
        400: '#dd3e3e',
        500: '#cd3d3d',
        600: '#b92929',
      },
    },

    spacing: {
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '22': '5.5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem'
    },

    backgroundColor: theme => theme('colors'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },

    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain'
    },

    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.300', 'currentColor')
    }),
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '0.25rem',
      lg: '0.5rem',
      full: '9999px'
    },

    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px'
    },

    boxShadow: {
      default:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outlineTeal: '0 0 6px rgba(40, 172, 177, 1)',
      outlineOrange: '0 0 6px rgba(255, 98, 40, 1)',
      none: 'none'
    },

    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed'
    },

    fill: {
      current: 'currentColor'
    },

    flex: {
      '1': '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none'
    },

    flexGrow: {
      '0': '0',
      default: '1'
    },

    flexShrink: {
      '0': '0',
      default: '1'
    },

    fontFamily: {
      title: [
        'Montserrat',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      body: [
        'Fira Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ]
    },

    fontSize: {
      xxs: '0.825rem',
      xs: '0.875rem',
      sm: '0.925rem',
      base: '1.05rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.35rem',
      '2xl': '1.5rem',
      '3xl': '1.9rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.5rem'
    },

    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },

    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh'
    }),
    inset: {
      '0': '0',
      auto: 'auto'
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    },

    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },

    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal'
    },

    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    maxHeight: {
      full: '100%',
      screen: '100vh'
    },

    maxWidth: {
      xxs: '10rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      full: '100%'
    },

    minHeight: {
      '0': '0',
      full: '100%',
      screen: '100vh'
    },

    minWidth: {
      '0': '0',
      full: '100%'
    },

    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },

    opacity: {
      '0': '0',
      '10': '0.1',
      '20': '0.2',
      '30': '0.3',
      '40': '0.4',
      '50': '0.5',
      '60': '0.6',
      '70': '0.7',
      '80': '0.8',
      '90': '0.9',
      '95': '0.95',
      '98': '0.98',
      '100': '1'
    },

    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12'
    },

    padding: theme => theme('spacing'),
    stroke: {
      current: 'currentColor'
    },

    textColor: theme => theme('colors'),
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.66667%',
      '2/6': '33.33333%',
      '3/6': '50%',
      '4/6': '66.66667%',
      '5/6': '83.33333%',
      '1/12': '8.33333%',
      '2/12': '16.66667%',
      '3/12': '25%',
      '4/12': '33.33333%',
      '5/12': '41.66667%',
      '6/12': '50%',
      '7/12': '58.33333%',
      '8/12': '66.66667%',
      '9/12': '75%',
      '10/12': '83.33333%',
      '11/12': '91.66667%',
      full: '100%',
      screen: '100vw'
    }),
    zIndex: {
      auto: 'auto',
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50'
    }
  },
  variants: {}
};
