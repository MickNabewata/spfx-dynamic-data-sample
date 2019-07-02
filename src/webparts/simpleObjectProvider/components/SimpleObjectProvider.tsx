import * as React from 'react';
import styles from './SimpleObjectProvider.module.scss';
import { ISimpleObjectProviderProps } from './ISimpleObjectProviderProps';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ObjectType } from '../../../dynamicData/objectData';
import { dateToString, stringToDate } from '../../../util/DateConverter';
import { stringToNumber } from '../../../util/NumericConverter';
import { ISimpleObjectProviderStates } from './ISimpleObjectProviderStates';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

/** 複数フィールド描画コンポーネント */
export default class SimpleObjectProvider extends React.Component<ISimpleObjectProviderProps, ISimpleObjectProviderStates> {

  /** 複数フィールド描画コンポーネント 初期化 */
  constructor(props : ISimpleObjectProviderProps) {
    super(props);

    // ステート初期化
    let emptyFieldValue = {
      name : undefined,
      ammount : undefined,
      date : undefined
    };

    let emptySubFieldValue = {
      subName : undefined,
      subAmmount : undefined
    };

    this.state = {
      field1 : { ...emptyFieldValue },
      field2 : { ...emptyFieldValue },
      objField1 : { ...emptySubFieldValue },
      objField2 : { ...emptySubFieldValue }
    };

    // 動的データの初期値をセット（こうしないとプロパティ名の一覧が出なくて不便なので）
    if(props.onFieldChanged1) props.onFieldChanged1({ ...emptyFieldValue, obj : { ...emptySubFieldValue } });
    if(props.onFieldChanged2) props.onFieldChanged2({ ...emptyFieldValue, obj : { ...emptySubFieldValue } });
  }

  /** フィールド入力値変更イベント */
  protected onFieldChanged = (field : 'field1' | 'field2' | 'objField1' | 'objField2') => (fieldName : string) => (event : React.FormEvent<HTMLTextAreaElement | HTMLInputElement>, newValue : any) => {
    if(field && fieldName) {
      let s = { ...this.state };
      s[field][fieldName] = newValue;
      this.setState(s);
  
      switch(field)
      {
        case 'field1' :
        case 'objField1' :
          if(this.props.onFieldChanged1)
          {
            this.props.onFieldChanged1({ ...this.state.field1, obj : { ...this.state.objField1 } });
          }
          break;
        case 'field2' :
        case 'objField2' :
          if(this.props.onFieldChanged2)
          {
            this.props.onFieldChanged2({ ...this.state.field2, obj : { ...this.state.objField2 } });
          }
          break;
      }
    }
  }

  /** フィールド描画 */
  protected renderFields(field : 'field1' | 'field2') {

    let subField : 'objField1' | 'objField2' = (field == 'field1')? 'objField1' : 'objField2';

    return (
      <div className={ styles.fieldArea }>
        { /** 名前 */ }
        <div className={ styles.field }>
          <TextField
            label="名前" 
            placeholder="値を入力すると動的データが更新されます" 
            onChange={ this.onFieldChanged(field)('name') }
            value={ this.state[field].name } />
        </div>
        { /** 数量 */ }
        <div className={ styles.field }>
          <TextField
            label="数量"
            placeholder="値を入力すると動的データが更新されます" 
            onChange={ (e, val) => {
              if(!val)
              {
                this.onFieldChanged(field)('ammount')(e, undefined);
              }
              else if(stringToNumber(val) != undefined)
              {
                this.onFieldChanged(field)('ammount')(e, stringToNumber(val));
              }
              else
              {
                this.onFieldChanged(field)('ammount')(e, this.state[field].ammount);
              }
            } }
            value={ (this.state[field].ammount != undefined)? this.state[field].ammount.toString() : '' } />
        </div>
        { /** 日付 */ }
        <div className={ styles.field }>
          <TextField
            label="日付"
            placeholder="値を入力すると動的データが更新されます" 
            onChange={ (e, val) => {
              if(val)
              {
                let date = stringToDate(val);
                if(date) this.onFieldChanged(field)('date')(e, date);         
              }
            } }
            value={ dateToString(this.state[field].date) } />
        </div>
        <div className={ styles.field } />
        { /** サブオブジェクト - 名前 */ }
        <div className={ styles.field }>
          <TextField
            label="サブオブジェクト - 名前"
            placeholder="値を入力すると動的データが更新されます" 
            onChange={ this.onFieldChanged(subField)('subName') }
            value={ this.state[subField].subName } />
        </div>
        { /** サブオブジェクト - 数量 */ }
        <div className={ styles.field }>
          <TextField
            label="サブオブジェクト - 数量"
            placeholder="値を入力すると動的データが更新されます" 
            onChange={ (e, val) => {
              if(!val)
              {
                this.onFieldChanged(subField)('subAmmount')(e, undefined);
              }
              else if(stringToNumber(val) != undefined)
              {
                this.onFieldChanged(subField)('subAmmount')(e, stringToNumber(val));
              }
              else
              {
                this.onFieldChanged(subField)('subAmmount')(e, this.state[subField].subAmmount);
              }
            } }
            value={ (this.state[subField] != undefined && this.state[subField].subAmmount != undefined)? this.state[subField].subAmmount.toString() : '' } />
        </div>
      </div>
    );
  }

  /** 描画 */
  public render(): React.ReactElement<ISimpleObjectProviderProps> {
    return (
      <div className={ styles.simpleObjectProvider }>
        <Pivot>
          <PivotItem
            headerText='オブジェクト1'
          >
            { this.renderFields('field1') }
          </PivotItem>
          <PivotItem
            headerText='オブジェクト2'
          >
            { this.renderFields('field2') }
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
