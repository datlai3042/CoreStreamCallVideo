import { ICON } from "@/app/constants"
import { ExtendFile } from "@/app/views/dev/sub/FormDev"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageIcon = (extend: ExtendFile) => {
  switch (extend) {
    case 'css': {
      return ICON['IconCss']
    }
    case 'scss': {
      return ICON['IconScss']

    }
    case 'tsx': {
      return ICON['IconReact']

    }

    case 'ts': {
      return ICON['IconTypescript']

    }
    default: {
      return ICON['IconTypescript']
    }
  }
}