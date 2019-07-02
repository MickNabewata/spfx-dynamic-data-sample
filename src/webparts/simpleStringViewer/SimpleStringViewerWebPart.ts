import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart, PropertyPaneDynamicFieldSet, PropertyPaneDynamicField } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'SimpleStringViewerWebPartStrings';
import SimpleStringViewer from './components/SimpleStringViewer';
import ISimpleStringViewerWebPartProps from './ISimpleStringViewerWebPartProps';

/** テキストボックスの入力値を動的データとして提供するサンプルWebパーツ */
export default class SimpleStringViewerWebPart extends BaseClientSideWebPart<ISimpleStringViewerWebPartProps> {

  /** 描画 */
  public render(): void {

    // 動的データの値を取得
    let dynamicDataValue : string = (this.properties.dynamicString)? this.properties.dynamicString.tryGetValue() : undefined;
    if(dynamicDataValue) dynamicDataValue = dynamicDataValue.toString();
    
    // 動的データのメタデータを取得
    let dynamicDataSource = (this.properties.dynamicString)? this.properties.dynamicString.tryGetSource() : undefined;
    let dynamicDataSourceTitle = (dynamicDataSource && dynamicDataSource.metadata)? dynamicDataSource.metadata.title : undefined;
    
    // 描画
    ReactDom.render(
      React.createElement(
        SimpleStringViewer,
        {
          dynamicDataSourceTitle: dynamicDataSourceTitle,
          dynamicDataValue : dynamicDataValue
        }
      ), 
      this.domElement);
  }

  /** Webパーツの破棄イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /** Webパーツのプロパティ定義 */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName : '接続',
              groupFields : [
                PropertyPaneDynamicFieldSet({
                  label : '接続',
                  fields : [
                    PropertyPaneDynamicField(
                      // プロパティ名はこのクラスのプロパティ定義(ISimpleStringViewerWebPartProps)と一致させる
                      'dynamicString',
                      {
                        label : '動的データ'
                      }
                    )
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
