//Клас-утиліта, який відповідає за збереження часток цілого
class Composition {
	constructor(elements)
	{
		if (elements == undefined) {
			elements = {};
		}

		this.elements = elements;
		this.rescale();
	}

	total() {
		let total = 0; 
		for (const v of Object.values(this.elements)) { 
			total += v;
		}
		return total;
	}
	rescale() {
		let total = this.total();

		if (Math.abs(total - 100) > 0.01) {
			let coefficient = 100 / total;
			for (const k of Object.keys(this.elements)) { 
				this.elements[k] *= coefficient;
			}
		}
	}
	validate() {
		for (const v of Object.values(this.elements)) { 
			if (v < 0) {
				return false;
			}
		}

		this.rescale();
		return true;
	}
}

//Клас, який працює з компонентами топлива, використовуючи клас Composition
class FuelComposition {
	constructor(c = 0, h = 0, s = 0, o = 0, n = 0, a = 0, w = 0) {
		this.composition = new Composition({
			"c": c,
			"h": h,
			"s": s,
			"o": o,
			"n": n,
			"a": a,
			"w": w,
		});
	}

	make_dry() {
		if (this.composition.elements["w"] > 0) {
			this.composition.elements["w"] = 0;
		}
		this.composition.rescale();
	}
	make_dryach() {
		if (this.composition.elements["w"] > 0) {
			this.composition.elements["w"] = 0;
		}
		if (this.composition.elements["a"] > 0) {
			this.composition.elements["a"] = 0;
		}
		this.composition.rescale();
	}

	get_combheat() {
		return 339 * this.composition.elements["c"]
			+ 1030 * this.composition.elements["h"]
			- 108.8 * (
				this.composition.elements["o"]
				- this.composition.elements["s"]
			)
			- 25 * this.composition.elements["w"];
	}
	clone() {
		return new FuelComposition(
			this.composition.elements["c"],
			this.composition.elements["h"],
			this.composition.elements["s"],
			this.composition.elements["o"],
			this.composition.elements["n"],
			this.composition.elements["a"],
			this.composition.elements["w"]
		);
	}
}


export { Composition, FuelComposition };