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