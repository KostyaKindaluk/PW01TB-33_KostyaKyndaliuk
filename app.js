import { FuelComposition } from "./utils.js";


class App {
	constructor() {
		let calc_form = document.getElementById("calc-form");
		calc_form.addEventListener("submit", (event) => this.calc_form_submit(event));
		this.remove_results();
	}

	//Обробка запиту на обрахунок
	calc_form_submit(event) {
		event.preventDefault();
		
		let cRaw = parseFloat(document.getElementById("c-raw").value);
		let hRaw = parseFloat(document.getElementById("h-raw").value);
		let sRaw = parseFloat(document.getElementById("s-raw").value);
		let oRaw = parseFloat(document.getElementById("o-raw").value);
		let nRaw = parseFloat(document.getElementById("n-raw").value);
		let aRaw = parseFloat(document.getElementById("a-raw").value);
		let wRaw = parseFloat(document.getElementById("w-raw").value);
		
		if (
			isNaN(cRaw) || isNaN(hRaw) || isNaN(sRaw) || isNaN(oRaw) ||
			isNaN(nRaw) || isNaN(aRaw) || isNaN(wRaw)
		) {
			alert("Please enter valid numbers for all inputs.");
			return;
		}
		
		let fuelComposition = new FuelComposition(cRaw, hRaw, sRaw, oRaw, nRaw, aRaw, wRaw);
		if (!fuelComposition.composition.validate()) {
			alert("Недопустимі значення");
			return;
		}
		
		this.add_results(fuelComposition);
	}
	//Додавання результатів на екран
	add_results(fuelComposition) {
		let dryComposition = fuelComposition.clone();
		dryComposition.make_dry();

		let dryachComposition = fuelComposition.clone();
		dryachComposition.make_dryach();

		let dryElementsRow = document.getElementById("dry-elements");
		let dryachElementsRow = document.getElementById("dryach-elements");

		dryElementsRow.innerHTML = `
			<th scope="row" class="text-decoration-underline" data-bs-toggle="tooltip" title="Робоча маса без вологи">
				Суха маса
			</th>
			<td>${dryComposition.composition.elements["c"].toFixed(2)} %</td>
			<td>${dryComposition.composition.elements["h"].toFixed(2)} %</td>
			<td>${dryComposition.composition.elements["s"].toFixed(2)} %</td>
			<td>${dryComposition.composition.elements["o"].toFixed(2)} %</td>
			<td>${dryComposition.composition.elements["n"].toFixed(2)} %</td>
			<td>${dryComposition.composition.elements["a"].toFixed(2)} %</td>
			<td>${dryComposition.composition.elements["w"].toFixed(2)} %</td>
		`;

		dryachElementsRow.innerHTML = `
			<th scope="row" class="text-decoration-underline" data-bs-toggle="tooltip" title="Суха маса без золи">
				Горюча маса
			</th>
			<td>${dryachComposition.composition.elements["c"].toFixed(2)} %</td>
			<td>${dryachComposition.composition.elements["h"].toFixed(2)} %</td>
			<td>${dryachComposition.composition.elements["s"].toFixed(2)} %</td>
			<td>${dryachComposition.composition.elements["o"].toFixed(2)} %</td>
			<td>${dryachComposition.composition.elements["n"].toFixed(2)} %</td>
			<td>${dryachComposition.composition.elements["a"].toFixed(2)} %</td>
			<td>${dryachComposition.composition.elements["w"].toFixed(2)} %</td>
		`;

		let rawCombheat = fuelComposition.get_combheat();
		let dryCombheat = dryComposition.get_combheat();
		let dryachCombheat = dryachComposition.get_combheat();

		document.getElementById("raw-combheat").textContent = rawCombheat.toFixed(2) + " кДж/кг";
		document.getElementById("dry-combheat").textContent = dryCombheat.toFixed(2) + " кДж/кг";
		document.getElementById("dryach-combheat").textContent = dryachCombheat.toFixed(2) + " кДж/кг";

		document.getElementById("result-1").style.display = "block";
		document.getElementById("result-2").style.display = "block";
	}
	//Прибирання результатів з екрану
	remove_results() {
		let result_1 = document.getElementById("result-1");
		let result_2 = document.getElementById("result-2");
		let dry_elements = document.getElementById("dry-elements");
		let dryach_elements = document.getElementById("dryach-elements");

		result_1.style.display = "none";
    result_2.style.display = "none";

    let tdElements = dry_elements.getElementsByTagName("td");
    while (tdElements.length > 0) {
        tdElements[0].remove();
    }

    tdElements = dryach_elements.getElementsByTagName("td");
    while (tdElements.length > 0) {
        tdElements[0].remove();
    }
	}
}


export { App };