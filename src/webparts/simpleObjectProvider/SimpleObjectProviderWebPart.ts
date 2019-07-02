import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SimpleObjectProviderWebPartStrings';
import SimpleObjectProvider from './components/SimpleObjectProvider';
import ISimpleObjectProviderWebPartProps from './ISimpleObjectProviderWebPartProps';
import ObjectData, { propertyId1, propertyId2, ObjectType } from '../../dynamicData/objectData';

/** 動的データとして2つのオブジェクト型の値を提供するサンプルWebパーツ */
export default class SimpleObjectProviderWebPart extends BaseClientSideWebPart<ISimpleObjectProviderWebPartProps> {

  /** 動的データ */
  private dynamicData : ObjectData;

  /** 描画 */
  public render(): void {
    ReactDom.render(
      React.createElement(
        SimpleObjectProvider,
        {
          onFieldChanged1 : this.onFieldChanged1,
          onFieldChanged2 : this.onFieldChanged2
        }
      ), 
      this.domElement);
  }

  /** フィールドの入力値変更イベント */
  protected onFieldChanged1 = (val : ObjectType) => {
    this.setDynamicData(propertyId1, val);
  }

  /** フィールドの入力値変更イベント */
  protected onFieldChanged2 = (val : ObjectType) => {
    this.setDynamicData(propertyId2, val);
  }

  /** 動的データの変更 */
  protected setDynamicData = (propId : string, val : ObjectType) => {
    // 動的データに値をセット
    this.dynamicData.setPropertyValue(propId, val);

    // 動的データの変更を通知
    // notifyPropertyChangedの引数は動的データと一致させる（当サンプルではSimpleStringクラスのpropertyId定数）
    this.context.dynamicDataSourceManager.notifyPropertyChanged(propId);
  }

  /** Webパーツ初期化イベント */
  protected onInit(): Promise<void> {

    // 動的データ初期化
    this.dynamicData = new ObjectData();
    this.context.dynamicDataSourceManager.initializeSource(this.dynamicData);

    // 初期化終了
    return Promise.resolve();
  }

  /** Webパーツ破棄イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
