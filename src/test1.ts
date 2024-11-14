const uploadDirectory = document.querySelector(
    `[data-id="uploadDirectory"]`,
) as HTMLInputElement;

const saveFileTest = document.querySelector(
    `[data-id="saveFileTest"]`,
) as HTMLInputElement;

uploadDirectory?.addEventListener("click", async () => {
    const dirHandle = await window.showDirectoryPicker();

    console.log(dirHandle.name);

    for await (const entry of dirHandle.values()) {
        console.log(entry);

        if (entry.kind === "directory") {
            console.log(entry.kind);
        }
        // console.log(entry.kind, entry.name)
    }

    console.log(await dirHandle.getDirectoryHandle(".godot"));
});

saveFileTest.addEventListener("click", async () => {
    try {
        await saveNewFile("");
    } catch (err) {
        console.error("Error to save file:", err);
    }
});

async function saveFile(handle: FileSystemFileHandle, contents: string) {
    const writable = await handle.createWritable();
    await writable.write(contents);
    await writable.close();
}

async function saveNewFile(contents: string) {
    const options: SaveFilePickerOptions = {
        types: [
            {
                description: "Game Format Export",
                accept: {
                    "application/json": [".json"],
                },
            },
        ],
    };

    const handle = await window.showSaveFilePicker(options);
    await saveFile(handle, contents);
}
