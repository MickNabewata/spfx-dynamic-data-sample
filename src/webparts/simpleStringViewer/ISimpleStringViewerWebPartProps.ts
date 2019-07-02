import { DynamicProperty } from '@microsoft/sp-component-base';

/** SimpleStringViewerWebPartクラスのプロパティ定義 */
export default interface ISimpleStringViewerWebPartProps {
    /** 文字列型の値を公開する動的データ */
    dynamicString : DynamicProperty<string>;
}