import { ObjectType } from '../../../dynamicData/objectData';

/** SimpleObjectProviderクラスのプロパティ定義 */
export interface ISimpleObjectProviderProps {
  /** フィールド1の入力値変更イベント */
  onFieldChanged1 : (val : ObjectType) => void;

  /** フィールド2の入力値変更イベント */
  onFieldChanged2 : (val : ObjectType) => void;
}
