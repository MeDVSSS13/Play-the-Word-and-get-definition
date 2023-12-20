`use strict`;

let inputValue;
const onChange = () => {
	inputValue = document.querySelector("input").value;
	let link = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`;
	fetch(link)
		.then((res) => res.json())
		.then((data) => {
			const existingAudio = document.querySelector("audio");
			if (existingAudio) {
				existingAudio.parentNode.removeChild(existingAudio);
			}

			const audioElement = createAudioElement(data);
			document.querySelector(`.dictionary`).append(audioElement);

			const existingDefinition = document.querySelector(`p`);
			if (existingDefinition) {
				existingDefinition.parentNode.removeChild(existingDefinition);
			}

			const definitionElement = createDefinition(data);
			document.querySelector(`.dictionary`).append(definitionElement);

			console.log(data);
		})
		.catch((err) => console.log(err));
};

const onClick = () => {
	const audioSelector = document.querySelector(`audio`);
	if (audioSelector) audioSelector.play();
};

document.querySelector(`input`).addEventListener(`change`, onChange);
document.querySelector(`button`).addEventListener(`click`, onClick);

const createAudioElement = (data) => {
	const audioElement = document.createElement(`audio`);
	if (
		data &&
		data[0] &&
		data[0].definitions &&
		data[0].phonetics[0] &&
		data[0].phonetics[0].audio
	) {
		const audioUrl = data[0].phonetics[0].audio;
		audioElement.src = audioUrl;
		audioElement.setAttribute("controls", "");
	} else {
		const audioUrl = data[0].phonetics[1].audio;
		audioElement.src = audioUrl;
		audioElement.setAttribute("controls", "");
	}
	return audioElement;
};
const createDefinition = (data) => {
	const definitionInfo = document.createElement(`p`);
	const definitionText = data[0].meanings[0].definitions[0].definition;
	definitionInfo.textContent = definitionText;
	return definitionInfo;
};
