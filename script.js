const adviceId = document.getElementById("idNumber");
const advice = document.getElementById("advice");
const button = document.getElementById("btn");
const contentBox = document.querySelector(".content");

let loading = false;
button.addEventListener("click", load);
window.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		load();
	}
});

function load() {
	if (loading) {
		return;
	} else {
		contentBox.classList.add("squish");
		button.classList.add("waiting");
		button.style.backgroundColor = "hsl(218, 16%, 30%)";
		loading = true;
		fetch("https://api.adviceslip.com/advice")
			.then((res) => res.json())
			.then((data) => {
				// console.log("quote", data);
				contentBox.classList.remove("squish");
				adviceId.innerText = data.slip.id;
				advice.innerText = data.slip.advice;
				button.classList.remove("waiting");
				setTimeout(() => {
					button.style.backgroundColor = "hsl(150, 100%, 66%)";
					loading = false;
				}, 1000);
			});
	}
}

load();
