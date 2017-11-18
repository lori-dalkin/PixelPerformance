export function assert(boolean, message) {
	try {
		if(!boolean) {
			throw new Error(message);
		}
		else {
			return;
		}
	}
	catch(e) {
		throw new Error(message);
	}
}
