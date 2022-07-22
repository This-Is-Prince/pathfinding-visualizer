import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { mazesPatterns } from "../assets/data";
import { AppStateType, GridType, ModalStateType } from "../types";

interface AppStateAction {
    addGrid: (grid: GridType) => void;
    changePlay: (isPlay: boolean) => void;
    mazeAnimationComplete: (isMazeAnimationComplete: boolean) => void;
    animationComplete: (isAnimationComplete: boolean) => void;
    changeNodeMaxWidth: (nodeMaxWidth: number) => void;
    changeModalState: (modalStyle: ModalStateType) => void;
    changeAsideModal: (isAsideModalOpen: boolean) => void;
    changeFullscreenModal: (isFullScreenModelOpen: boolean) => void;
    changeMaze: (maze: string) => void;
    changeFindAnimationNodes: (isFindAnimationNodes: boolean) => void;
    changeAlgorithm: (algorithm: string) => void;
    changeSpeed: (speed: string) => void;
    openSettings: (isSettingsOpen: boolean) => void;
    clearBoard: (isBoardClear: boolean) => void;
}

const useStore = create<AppStateType & AppStateAction>()(
    devtools(
        persist((set) => ({
            grid: { row: 0, column: 0 },
            nodeMaxWidth: 25,
            modalState: mazesPatterns,
            speed: "fast",
            pathArr: [],
            visitedArr: [],
            maze: "",
            algorithm: "bfs",
            isPlay: false,
            isBoardClear: false,
            isSettingsOpen: false,
            isAsideModalOpen: false,
            isAnimationComplete: true,
            isFindAnimationNodes: true,
            isFullScreenModelOpen: true,
            isMazeAnimationComplete: true,

            // Action
            addGrid: (grid) => {
                set({grid});
            },
            changePlay: (isPlay) => {
                set({isPlay});
            },
            mazeAnimationComplete: (isMazeAnimationComplete) => {
                set({isMazeAnimationComplete});
            },
            animationComplete: (isAnimationComplete) => {
                set({isAnimationComplete});
            },
            changeNodeMaxWidth: (nodeMaxWidth) => {
                set({nodeMaxWidth});
            },
            changeModalState: (modalState) => {
                set({modalState});
            },
            changeAsideModal: (isAsideModalOpen) => {
                set({isAsideModalOpen});
            },
            changeFullscreenModal: (isFullScreenModelOpen) => {
                set({isFullScreenModelOpen});
            },
            changeMaze: (maze) => {
                set({maze});
            },
            changeFindAnimationNodes: (isFindAnimationNodes) => {
                set({isFindAnimationNodes});
            },
            changeAlgorithm: (algorithm) => {
                set({algorithm});
            },
            changeSpeed: (speed) => {
                set({speed});
            },
            openSettings: (isSettingsOpen) => {
                set({isSettingsOpen});
            },
            clearBoard: (isBoardClear) => {
                set({isBoardClear});
            },
        }))
    )
);

export default useStore;