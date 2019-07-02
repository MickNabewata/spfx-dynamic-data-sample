import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneDropdownOptionType, IPropertyPaneConfiguration, PropertyPaneDropdown, IPropertyPaneDropdownOption} from '@microsoft/sp-property-pane';
import CustomObjectViewer from './components/CustomObjectViewer';
import { IDynamicDataSource } from "@microsoft/sp-dynamic-data";
import ICustomObjectViewerWebPartProps from './ICustomObjectViewerWebPartProps';
import { DynamicProperty } from '@microsoft/sp-component-base';

/** 動的データを手動で読み込むサンプルWebパーツ */
export default class CustomObjectViewerWebPart extends BaseClientSideWebPart<ICustomObjectViewerWebPartProps> {

  private dynamicData: DynamicProperty<any>;
  
  /** 描画 */
  public render(): void {
    this.registerDynamicDataReference();

    ReactDom.render(
      React.createElement(
        CustomObjectViewer,
        {
          dynamicData: this.getDynamicPropertyValues()
        }
      ), 
      this.domElement);
  }

  /** Webパーツの破棄イベント */
  protected onDispose(): void {
    this.unregisterDynamicDataReference();
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /** 動的データを初期化 */
  protected initDynamicData() {
    if (!this.dynamicData) {
      this.dynamicData = new DynamicProperty<any>(this.context.dynamicDataProvider, this.render);
      this.dynamicData.register(this.render);
    }
  }

  /** 動的データの変更を捕まえるリスナーを登録 */
  protected registerDynamicDataReference() {
    if (this.properties.dynamicDataSource
      && this.properties.dynamicDataSource.length > 0
      && this.properties.dynamicDataProperty
      && this.properties.dynamicDataProperty.length > 0)
    {
      this.initDynamicData();
      this.dynamicData.setReference(`${this.properties.dynamicDataSource}:${this.properties.dynamicDataProperty}`);
    }
    else
    {
      this.unregisterDynamicDataReference();
    }
  }

  /** 動的データの変更を捕まえるリスナーを登録解除 */
  protected unregisterDynamicDataReference() {
    if (this.dynamicData) this.dynamicData.unregister(this.render);
  }

  /** 利用可能な動的データを取得 */
  protected getAvailableDataSources(webpartNames: string[] = []): IDynamicDataSource[] {
    let ret: IDynamicDataSource[] = [];
    this.context.dynamicDataProvider.getAvailableSources().forEach((source) => {
      if (webpartNames && webpartNames.length > 0) {
        webpartNames.forEach((webpartName) => {
          if (source.metadata.title == webpartName) ret.push(source);
        });
      }
      else {
        ret.push(source);
      }
    });

    return ret;
  }

  /** 利用可能な動的データを選択するためのドロップダウン選択肢を取得 */
  protected getDynamicDataSourceDropdownOptions() : IPropertyPaneDropdownOption[] {
    let ret: IPropertyPaneDropdownOption[] = [];

    // SimpleObjectProvider Webパーツが提供する動的データを取得
    // (ページにWebパーツを2つ貼ることもできるのでここで選択させる)
    let webpartName = ['SimpleStringProvider', 'SimpleObjectProvider' ];
    let sources = this.getAvailableDataSources(webpartName);
    if (sources)
    {
      sources.forEach((source, i) => {
        ret.push({
          index: i,
          key: source.id,
          text: source.metadata.title,
          type: PropertyPaneDropdownOptionType.Normal
        });
      });
    }

    return ret;
  }

  /** 選択中の動的データソースから利用可能なプロパティを選択するためのドロップダウン選択肢を取得 */
  protected getDynamicPropertyDropdownOptions(): IPropertyPaneDropdownOption[] {
    let ret: IPropertyPaneDropdownOption[] = [];

    if (this.properties.dynamicDataSource && this.properties.dynamicDataSource.length > 0) {
      let source = this.context.dynamicDataProvider.tryGetSource(this.properties.dynamicDataSource);
      if (source) {
        source.getPropertyDefinitions().forEach((property, i) => {
          ret.push({
            index: i,
            key: property.id,
            text: property.title,
            type: PropertyPaneDropdownOptionType.Normal
          });
        });
      }
    }

    return ret;
  }

  /** 選択中の動的データソースとプロパティから値を取得 */
  protected getDynamicPropertyValues(): any {
    let ret: any;

    if (this.properties.dynamicDataSource && this.properties.dynamicDataSource.length > 0 && this.properties.dynamicDataProperty && this.properties.dynamicDataProperty.length > 0) {
      let source = this.context.dynamicDataProvider.tryGetSource(this.properties.dynamicDataSource);
      if (source) {
        ret = source.getPropertyValue(this.properties.dynamicDataProperty);
      }
    }

    return ret;
  }

  /** Webパーツのプロパティ定義 */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: '動的データ接続',
              groupFields: [
                PropertyPaneDropdown('dynamicDataSource', {
                  options: this.getDynamicDataSourceDropdownOptions(),
                  label: 'データソース (Webパーツ)'
                }),
                PropertyPaneDropdown('dynamicDataProperty', {
                  options: this.getDynamicPropertyDropdownOptions(),
                  label: 'プロパティ',
                  disabled: !(this.properties.dynamicDataSource && this.properties.dynamicDataSource.length > 0)
                })
              ]
            }
          ],
          displayGroupsAsAccordion : false
        }
      ]
    };
  }
}
