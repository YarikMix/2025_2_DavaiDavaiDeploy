import { Component } from 'ddd-react';
import styles from './Layout.module.scss';

export default class Layout extends Component {
	render() {
		return <div className={styles.layout}>{this.props.children}</div>;
	}
}
