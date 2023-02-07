export const getFullName = (
	firstName?: string | null,
	lastName?: string | null
) => {
	if (firstName && lastName) {
		return `${firstName} ${lastName}`;
	} else if (firstName) {
		return firstName;
	} else if (lastName) {
		return `Mr or Mrs ${lastName}`;
	} else {
		return "Anonymous";
	}
};
