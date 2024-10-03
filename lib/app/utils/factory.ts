import type { TAnything, TClass } from "../../types";

export default class Factory {
	[key: string]: TAnything;

	private object: TAnything;
	protected format: TAnything = {};

	constructor(object: TAnything) {
		this.object = object;

		this.formatResource();
	}

	private formatResource() {
		this.mapGetters();
		this.deleteGetters();
		this.applyFormat();
	}

	private mapGetters() {
		for (const key in this.object) {
			this[key] = this.object[key];
		}
	}

	private deleteGetters() {
		const formatKeys = Object.keys(this.format);
		const resourceKeys = Object.keys(this.object);

		for (const key of resourceKeys) {
			if (formatKeys.includes(key)) return;
			delete this[key];
		}

		this.object = undefined;
	}

	private applyFormat() {
		const formatKeys = Object.keys(this.format);

		for (const key of formatKeys) {
			this[key] = this.format[key];
		}
	}

	static collection(array: Array<TAnything>, abstract: TClass<Factory>) {
		if (!Array.isArray(array)) {
			const typeOf = typeof array;

			throw new Error(`Given data must be an Iterable: ${typeOf} given`);
		}

		return array.map((item) => new abstract(item));
	}

	static create(object: TAnything, abstract: TClass<Factory>) {
		return new abstract(object);
	}
}
