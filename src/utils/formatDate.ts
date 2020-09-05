import moment from "moment";

export const formatDate = (date: number) =>
	moment(date).format("DD/MM/YYYY HH:mm");
