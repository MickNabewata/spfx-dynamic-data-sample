import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'SimpleStringProviderWebPartStrings';
import SimpleStringProvider from './components/SimpleStringProvider';
import ISimpleStringProviderWebPartProps from './ISimpleStringProviderWebPartProps';
import SimpleString, { propertyId } from '../../dynamicData/simpleString';

/** 動的データとして単純な文字列を提供するサンプルWebパーツ */
export default class SimpleStringProviderWebPart extends BaseClientSideWebPart<ISimpleStringProviderWebPartProps> {

  /** 動的データ */
  private dynamicData : SimpleString;

  /** 描画 */
  public render(): void {
    ReactDom.render(
      React.createElement(
        SimpleStringProvider,
        {
          onTextFieldChanged : this.onTextFieldChanged
        }
      ),
      this.domElement);
  }

  /** テキストフィールドの入力値変更イベント */
  protected onTextFieldChanged = (val : string) => {

    // 動的データに値をセット
    this.dynamicData.setPropertyValue(val);

    // 動的データの変更を通知
    // notifyPropertyChangedの引数は動的データと一致させる（当サンプルではSimpleStringクラスのpropertyId定数）
    this.context.dynamicDataSourceManager.notifyPropertyChanged(propertyId);
  }

  /** Webパーツ初期化イベント */
  protected onInit(): Promise<void> {

    // 動的データ初期化
    this.dynamicData = new SimpleString();
    this.context.dynamicDataSourceManager.initializeSource(this.dynamicData);

    // 初期化終了
    return Promise.resolve();
  }

  /** Webパーツ破棄イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
