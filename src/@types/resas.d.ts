declare module 'Resas' {
  export interface PrefObject {
    message?: any
    result: PrefResult[]
  }

  interface PrefResult {
    prefCode: number
    prefName: string
  }

  export interface GraphObject {
    message?: any
    result: GraphResult
  }

  interface GraphResult {
    boundaryYear: number
    data: Datum2[]
  }

  interface Datum2 {
    label: string
    data: Datum[]
  }

  interface Datum {
    year: number
    value: number
    rate?: number
  }

  export interface GraphData {
    code: number
    data: GraphObject
  }
}
