import * as React from "react";
export interface ChildrenType {
  children?: React.ReactNode | React.ReactElement;
}
export interface listItemType {
  url: string;
  title: string;
}

export type postUrl = "/media" | "/phrase" | "/word" | "/media-category";

export interface LanguageItemsProps {
  key: string;
  label: string;
  img: string;
}

export interface zustandProps {
  theme: string;
  setTheme: (mode: string) => void;
}

export interface image {
  _id: string;
  path: string;
}

export interface WordProps {
  comment_uz: string;
  _id: string;
  comment_en?: string;
  description_uz: string;
  description_en?: string;
  image: image;
  title_en: string;
  title_uz: string;
}
