import { NextPage } from "next";
import { Column, Font } from "@bd-dm/ui";
import Head from "next/head";
import styles from "./index.module.scss";

const Error404: NextPage = () => {
	return (
		<>
			<Head>
				<title>Gallereee - Not Found</title>
			</Head>
			<Column
				className={styles.error404}
				horizontalAlignment={Column.HorizontalAlignment.CENTER}
				verticalAlignment={Column.VerticalAlignment.CENTER}
			>
				<Font type={Font.Type.H1}>Ошибка 404</Font>
				<p>Страница не найдена</p>
			</Column>
		</>
	);
};

export default Error404;
