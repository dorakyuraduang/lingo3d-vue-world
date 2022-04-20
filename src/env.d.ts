/// <reference types="vite/client" />
declare module 'recorder-js'
declare module 'recorder-core/recorder.wav.min'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
