// Buttons
const videoElement = document.querySelector("video");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const videoSelectBtn = document.querySelector("#videoSelectBtn");
videoSelectBtn.addEventListener("onClick", getVideoSources);

const { desktopCapturer, remote } = require("electron");
const { Menu } = remote;

// Get the available video sources
async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
        types: ["window", "screen"],
    });

    const videoOptionsMenu = Menu.buildFromTemplate(
        inputSources.map(source => {
            return {
                label: source.name,
                click: () => selectSource(source)
            }
        })
    )

    videoOptionsMenu.popup();
}
