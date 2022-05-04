if (typeof window !== "undefined" && !window.crypto) {
	window.crypto = window.msCrypto;
}
