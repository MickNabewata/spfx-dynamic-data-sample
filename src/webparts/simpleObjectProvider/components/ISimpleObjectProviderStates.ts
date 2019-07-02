/** SimpleObjectProviderクラスのステート定義 */
export interface ISimpleObjectProviderStates {
  /** フィールド入力値1 */
  field1 : IInputFields;
  /** フィールド入力値2 */
  field2 : IInputFields;
  /** サブフィールド入力値1 */
  objField1 : IInputSubFields;
  /** サブフィールド入力値2 */
  objField2 : IInputSubFields;
}

/** 入力フィールド */
export interface IInputFields {
  /** 名前 */
  name : string;
  /** 数量 */
  ammount : number;
  /** 日付 */
  date : Date;
}

/** サブ入力フィールド */
export interface IInputSubFields {
  /** 名前 */
  subName : string;
  /** 数量 */
  subAmmount : number;
}