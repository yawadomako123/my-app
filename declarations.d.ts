// declarations.d.ts

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.avif' {
  const value: string;
  export default value;
}

declare module '*.mp4' {
  const value: string;
  export default value;
}

declare module 'react-native-vector-icons/FontAwesome' {
  // import { Icon } from 'react-native-vector-icons/Icon';
  export default Icon;
}

// declarations.d.ts
declare module 'react-native-onboarding-swiper';

declare module 'react-native-onboarding-swiper' {
  import { ComponentType, ReactNode } from 'react';
  import {
    ViewStyle,
    ImageSourcePropType,
    TextStyle,
    StyleProp,
  } from 'react-native';

  export interface OnboardingPage {
    backgroundColor?: string;
    image?: ReactNode;
    title?: string;
    subtitle?: string;
    titleStyles?: StyleProp<TextStyle>;
    subTitleStyles?: StyleProp<TextStyle>;
  }

  export interface OnboardingProps {
    pages: OnboardingPage[];
    onDone?: () => void;
    onSkip?: () => void;
    showSkip?: boolean;
    showNext?: boolean;
    showDone?: boolean;
    nextLabel?: string;
    skipLabel?: string;
    doneLabel?: string;
    bottomBarHighlight?: boolean;
    bottomBarColor?: string;
    imageContainerStyles?: StyleProp<ViewStyle>;
    titleStyles?: StyleProp<TextStyle>;
    subTitleStyles?: StyleProp<TextStyle>;
    containerStyles?: StyleProp<ViewStyle>;
  }

  const Onboarding: ComponentType<OnboardingProps>;
  export default Onboarding;
}