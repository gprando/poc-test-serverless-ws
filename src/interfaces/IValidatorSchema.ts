interface IValidatorProprieties {
  body: {
    type: string
    properties: any
    required?: string[]
  }
}

export interface IValidatorSchema {
  type: string
  properties: IValidatorProprieties
}
