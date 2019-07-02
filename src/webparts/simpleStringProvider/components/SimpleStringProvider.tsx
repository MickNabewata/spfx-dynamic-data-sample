import * as React from 'react';
import styles from './SimpleStringProvider.module.scss';
import { ISimpleStringProviderProps } from './ISimpleStringProviderProps';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

/** テキストフィールド 描画コンポーネント */
export default class SimpleStringProvider extends React.Component<ISimpleStringProviderProps, {}> {

  /** テキストフィールドの入力値変更イベント */
  protected onTextFieldChanged = (event : React.FormEvent<HTMLInputElement>, newValue : string) => {
    if(this.props.onTextFieldChanged)
    {
      this.props.onTextFieldChanged(newValue);
    }
  }

  /** 描画 */
  public render(): React.ReactElement<ISimpleStringProviderProps> {
    return (
      <div className={ styles.simpleStringProvider }>
        <TextField
          label="動的データの値" 
          placeholder="値を入力すると動的データが更新されます" 
          onChange={ this.onTextFieldChanged }
          className={ styles.textField } />
      </div>
    );
  }
}
