import { GameCore } from "../lib";

const buttonUploadGame = document.querySelector(
	`[data-id="uploadGame"]`,
) as HTMLInputElement;

const game = new GameCore();

buttonUploadGame.addEventListener("input", () => {
	const reader = new FileReader();

	const files = buttonUploadGame.files as FileList;

	if (files.length) {
		reader.readAsText(files[0]);

		reader.onload = async () => {
			await game.load(reader.result as string);

			game.start();

			buttonUploadGame.remove();

			reader.abort();
		};

		reader.onerror = () => {
			console.log(reader.error);
		};
	}
});
