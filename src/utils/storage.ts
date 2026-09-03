import {storage} from "#imports";
import type {popupFrom} from "@/types/types.ts";

export const popupFormStorage = storage.defineItem<popupFrom>('local:bilibili_style', {
  fallback: {
    fontFamily: 'Microsoft YaHei',
  }
})

export const autoWebFullscreenStorage = storage.defineItem<number>('local:bilibili_webFullscreen', {
  fallback: 0
})
