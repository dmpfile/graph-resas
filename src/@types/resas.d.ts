declare module 'Resas' {
  export interface PrefObject {
    message?: any
    result: Result[]
  }

  export interface Result {
    prefCode: number
    prefName: string
  }
}
