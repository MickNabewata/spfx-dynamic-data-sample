import * as React from 'react';
import styles from './SimpleStringViewer.module.scss';
import { ISimpleStringViewerProps } from './ISimpleStringViewerProps';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';

export default class SimpleStringViewer extends React.Component<ISimpleStringViewerProps, {}> {
  public render(): React.ReactElement<ISimpleStringViewerProps> {
    return (
      <div className={ styles.simpleStringViewer }>
        <MessageBar className={ styles.message } >
          動的データソース名：{ this.props.dynamicDataSourceTitle }
        </MessageBar>
        <MessageBar className={ styles.message } >
          動的データの値：{ this.props.dynamicDataValue }
        </MessageBar>
      </div>
    );
  }
}
