// eslint-disable-next-line
import { formatRelative, parseISO } from "date-fns";
// eslint-disable-next-line
import { ru } from "date-fns/locale";

const formatDate = (date: string): string =>
	formatRelative(parseISO(date), new Date(), { locale: ru });

export { formatDate };
