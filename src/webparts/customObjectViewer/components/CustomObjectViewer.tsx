import * as React from 'react';
import styles from './CustomObjectViewer.module.scss';
import { ICustomObjectViewerProps } from './ICustomObjectViewerProps';

/** 動的データ表示Webパーツ */
export default class CustomObjectViewer extends React.Component<ICustomObjectViewerProps, {}> {
  public render(): React.ReactElement<ICustomObjectViewerProps> {
    return (
      <div className={ styles.customObjectViewer }>
        {
          (this.props.dynamicData)? 
            JSON.stringify(this.props.dynamicData) : 
            ''
        }
      </div>
    );
  }
}
