import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';

/** プロパティID */
export const propertyId = 'simpleString';

/** 単純なStringを公開する動的データクラス */
export default class SimpleString implements IDynamicDataCallables {

  /** 値 */
  private _value : string;

  /** 動的データの型定義 */
  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: propertyId,
        title: '単純文字列'
      }
    ];
  }
  
  /** 値を取得 */
  public getPropertyValue(propId: string): string {
    switch (propId) {
        case propertyId:
            return this._value;
    }

    throw new Error('プロパティIDが不正です。');
  }

  /** 値をセット */
  public setPropertyValue(value : string)
  {
    this._value = value;
  }
}