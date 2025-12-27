import { Component } from 'ddd-react';
import styles from './loadingState.module.scss';

export class LoadingState extends Component {
	render() {
		return <div className={styles.spinner}></div>;
	}
}
