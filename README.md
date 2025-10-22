# XiangGui App

## Project Tech Stack Guide

### package manager

- pnpm 9.15.2

- expo-cli

### UI framework

- ReactNative-Expo
  
  - file based route

### StyleSheet Solution

- StyleSheet

- nativewind(tailwindcss v3 compatible)

### Components Lib

- ReactNativeReuseable

- GlueStack

- lucide-react-native as icon lib

### Animation

- moti

### Data Fetching

Axios + Zod v4 (Data validation) + tanstack/react-query(aysnc data management)

### state management

- jotai

### dev-cli

- expo-cli

- cross-env

## What do you need

start it up after you learned:

- basic `react` concept: `state`, `effect`, `layoutEffect`, `ref`, Fragment

- run the example coed of `expo` docs, and other core concepts

- css `flex`、box-sizing、color and so on
  
  - (optinal) basic `tailwindcss v3` atomic class, but we will use `nativewind`

- baisc `tanstack/react-query` api
  
  - useQuery
  
  - useMutation
  
  - useQueryClient
  
  - useInfiniteQuery (for pagination, or list query)

- `zod` v4
  
  - z.object(), z.string(), z.number()...
  
  - z.union()
  
  - advanced:
    
    - .extend()
    
    - .refine()
    
    - .transform()

- `jotai`, basic usage(atomic state)
- or `zustand`, or `valtio`, if you like them.

- basic typescript concepts
  
  - data type: string、number、literal、...

## pre condition

> turn on TUN mode for your proxy is recommanded because not every step is able to set up the mirror for download

### node

you need a nodejs env to start your dev

use `fnm` or `nvm` to manage your nodejs version easier

use node v22 or v24 is recommanded

then you need `npm i -g pnpm@9.15.2` to use pnpm as the package manager

if you want to download nodejs package from mirror site in easier way, `pnpm add -g nrm`, and check nrm useage.

### java

java 21

### Android Studio

download and check it...

## dev guild

assume you have learned essential concept from the tutorial of `expo` [link](https://docs.expo.dev/tutorial/introduction/)

create `.env.local` in the root dir

`EXPO_PUBLIC_API_BASE_URL=xxx` to set up query client base url

start dev build on your android phone, run `pnpm dev:android`， and the device should connect to your PC using USB(and WIFI)