import { VFC } from "react";
import { AnchorButton, Column, Font } from "@bd-dm/ui";
import { LogoIcon } from "components/icons/LogoIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { config } from "config";
import styles from "./index.module.scss";

const Landing: VFC = () => {
	return (
		<Column className={styles.container}>
			<Column className={styles.head}>
				<Column
					horizontalAlignment={Column.HorizontalAlignment.CENTER}
					className={styles.logo}
				>
					<LogoIcon />
				</Column>
				<Font type={Font.Type.H1} className={styles.title}>
					Gallereee
				</Font>
			</Column>

			<Column className={styles.body}>
				<Column className={styles.description}>
					<Font type={Font.Type.H3} className={styles.slogan}>
						Ментально-здоровое пространство для твоих фото
					</Font>
					<Column>
						<ul className={styles.points}>
							<li>Никаких лайков</li>
							<li>Никаких историй</li>
							<li>Никакой зависимости</li>
							<li className={styles["point-good"]}>Только фото</li>
						</ul>
					</Column>
				</Column>
				<Column>
					<AnchorButton
						href={config.botUrl}
						className={styles["action-button"]}
					>
						Создать свою галерею{" "}
						<FontAwesomeIcon
							icon={faArrowRight}
							className={styles["action-button-icon"]}
							width="1em"
							height="1em"
						/>
					</AnchorButton>
				</Column>
			</Column>
		</Column>
	);
};

export { Landing };
