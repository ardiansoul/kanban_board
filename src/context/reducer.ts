import { BoardTypes } from ".";
import { getBoards, onAddItem, onChangeBoard, onDragEnd, onRemoveItem, onUpdateItem } from "./services";

export interface State {
    board: BoardTypes[],
    count: number
}
export const initialState: State = {
    board: [],
    count: 0
}

export interface Action {
    type: "SET_BOARDS" | "GET_BOARDS" | string,
    payload?: any
}

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "GET_BOARDS":
            let data = getBoards()
            return {
                ...state,
                board: data.board,
                count: data.count
            }
        case "SET_BOARDS":
            let moveData: State = onDragEnd(action.payload)
            return {
                ...state,
                board: moveData.board,
                count: moveData.count
            }
        case "ADD_ITEM":
            let addedData: State = onAddItem(action.payload.boardId, action.payload.item)
            return {
                ...state,
                board: addedData.board,
                count: addedData.count
            }
        case "UPDATE_ITEM":
            let updatedData: State = onUpdateItem(action.payload.boardId, action.payload.itemId, action.payload.data)
            return {
                ...state,
                board: updatedData.board,
                count: updatedData.count
            }
        case "REMOVE_ITEM":
            let removedData: State = onRemoveItem(action.payload.boardId, action.payload.itemId)
            return {
                ...state,
                board: removedData.board,
                count: removedData.count
            }
        case "CHANGE_BOARD":
            let changedBoard: State = onChangeBoard(action.payload.boardId, action.payload.data)
            return {
                ...state,
                board: changedBoard.board,
                count: changedBoard.count
            }
        default:
            throw new Error("Action not match");

    }
}