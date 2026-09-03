import {storage} from "#imports";
import type {popupFrom} from "@/types/types.ts";

export const popupFormStorage = storage.defineItem<popupFrom>('local:bilibili_style', {
  fallback: {
    fontFamily: null,
    upNameColor: null,
  }
})

export const autoWebFullscreenStorage = storage.defineItem<number>('local:bilibili_webFullscreen', {
  fallback: 0
})

export const searchHistoryStorage = storage.defineItem<number>('local:bilibili_searchHistory', {
  fallback: 1
})
