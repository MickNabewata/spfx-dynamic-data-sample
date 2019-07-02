import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';

/** プロパティID */
export const propertyId1 = 'objectData';
export const propertyId2 = 'objectData2';

/** 型情報 */
export interface ObjectType {
  /** 名前 */
  name : string;
  /** 数量 */
  ammount : number;
  /** 日付 */
  date : Date;
  /** オブジェクト */
  obj : SubObjectType;
}

/** サブ型情報 */
export interface SubObjectType {
    /** 名前 */
    subName : string;
    /** 数量 */
    subAmmount : number;
}

/** 構造化されたデータを公開する動的データクラス */
export default class ObjectData implements IDynamicDataCallables {

  /** 値1 */
  private _value1 : ObjectType;

  /** 値2 */
  private _value2 : ObjectType;

  /** 動的データの型定義 */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: propertyId1,
        title: 'オブジェクト1'
      },
      {
        id: propertyId2,
        title: 'オブジェクト2'
      }
    ];
  }
  
  /** 値を取得 */
  public getPropertyValue(propId: string): ObjectType {
    switch (propId) {
        case propertyId1:
          return this._value1;
        case propertyId2:
            return this._value2;
    }

    throw new Error('プロパティIDが不正です。');
  }

  /** 値をセット */
  public setPropertyValue(propId: string, value : ObjectType)
  {
    switch (propId) {
      case propertyId1:
        this._value1 = value;
        break;
      case propertyId2:
        this._value2 = value;
        break;
      default :
        throw new Error('プロパティIDが不正です。');
    }
  }
}