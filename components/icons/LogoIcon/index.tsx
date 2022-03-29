import { SVGProps, VFC } from "react";
import styles from "./index.module.scss";

const LogoIcon: VFC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		width="1em"
		height="1em"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 141 141"
		{...props}
	>
		<path
			d="M141 70.5c0 38.936-31.564 70.5-70.5 70.5S0 109.436 0 70.5 31.564 0 70.5 0 141 31.564 141 70.5Z"
			className={styles["accent-circle"]}
		/>
		<path
			d="M130.425 70.5c0 33.096-26.829 59.925-59.925 59.925S10.575 103.596 10.575 70.5 37.405 10.575 70.5 10.575c33.096 0 59.925 26.83 59.925 59.925Z"
			className={styles["accent-opposite-circle"]}
		/>
		<path
			d="M121.612 70.5c0 28.229-22.883 51.113-51.112 51.113-28.229 0-51.112-22.884-51.112-51.113S42.27 19.388 70.5 19.388c28.229 0 51.112 22.883 51.112 51.112Z"
			className={styles["accent-circle"]}
		/>
	</svg>
);

export { LogoIcon };
