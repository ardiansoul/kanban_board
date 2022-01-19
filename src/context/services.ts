import { DropResult } from "react-beautiful-dnd"
import { BoardTypes, Item } from "."
import { v4 as uuid } from "uuid"
import { State } from "./reducer"

export const getBoards = (): State => {
    const Boards: string | null = localStorage.getItem("boards")
    if (Boards) {
        let board: BoardTypes[] = JSON.parse(Boards)
        if (board.length > 0) {
            let length = board.reduce((prev: any, next: any) => {
                return [...prev, ...next.items]
            }, []).length
            return { board: board, count: length }
        }
    } else {
        let data = [
            {
                id: uuid(),
                name: "Todo",
                items: []
            }, {
                id: uuid(),
                name: "Progress",
                items: []
            }, {
                id: uuid(),
                name: "Done",
                items: []
            }
        ]
        localStorage.setItem("boards", JSON.stringify(data))
        let length = data.reduce((prev: any, next: any) => {
            return [...prev, ...next.items]
        }, []).length
        return { board: data, count: length }
    } return { board: [], count: 0 }

}

export const onDragEnd = (result: DropResult): State => {
    let { board, count } = getBoards()
    if (board.length > 0) {
        if (result.destination) {
            let data: BoardTypes[]
            const arr = Array.from(board)
            const sourceIndex = arr.findIndex((item) => item.id === result.source.droppableId)
            const destIndex = arr.findIndex((item) => item.id === result.destination?.droppableId)


            if (sourceIndex !== destIndex) {
                const sourceColumn = arr[sourceIndex]
                const destColumn = arr[destIndex]
                const sourceItems = [...sourceColumn.items]
                const destItems = [...destColumn.items]
                const [removed] = sourceItems.splice(result.source.index, 1)
                destItems.splice(result.destination.index, 0, removed)
                data = board.map((item) => item.id === result.source.droppableId ? { ...item, items: sourceItems } : item.id === result.destination?.droppableId ? { ...item, items: destItems } : { ...item })
            } else {
                const sourceColumn = arr[sourceIndex]
                const copiedItems = [...sourceColumn.items]
                const [removed] = copiedItems.splice(result.source.index, 1)
                copiedItems.splice(result.destination.index, 0, removed)
                data = board.map((item) => item.id === result.source.droppableId ? { ...item, items: copiedItems } : item)
            }

            localStorage.setItem("boards", JSON.stringify(data))
            let length = data.reduce((prev: any, next: any) => {
                return [...prev, ...next.items]
            }, []).length
            return { board: data, count: length }
        } else {
            return { board: board, count: count }
        }
    } else {
        return { board: [], count: 0 }
    }

}

export const onAddItem = (boardId: string, item: Item): State => {
    let { board } = getBoards()
    if (board.length > 0) {
        let boardIndex = board.findIndex((item) => item.id === boardId)
        let data: Item = {
            id: uuid(),
            name: item.name
        }

        board[boardIndex].items = [...board[boardIndex].items, data]
        localStorage.setItem("boards", JSON.stringify(board))
        let length = board.reduce((prev: any, next: any) => {
            return [...prev, ...next.items]
        }, []).length
        return { board, count: length }
    } else {
        return { board: [], count: 0 }
    }
}

export const onRemoveItem = (boardId: string, itemId: string): State => {
    let { board } = getBoards()
    if (board.length > 0) {
        let boardIndex = board.findIndex((item) => item.id === boardId)
        let items = board[boardIndex].items.filter(val => val.id !== itemId)
        board[boardIndex].items = [...items]
        localStorage.setItem("boards", JSON.stringify(board))
        let length = board.reduce((prev: any, next: any) => {
            return [...prev, ...next.items]
        }, []).length
        return { board, count: length }
    } else {
        return { board: [], count: 0 }
    }
}

export const onUpdateItem = (boardId: string, itemId: string, data: string): State => {
    let { board } = getBoards()
    if (board.length > 0) {
        let boardIndex = board.findIndex((item) => item.id === boardId)
        let items = board[boardIndex].items.map((val) => {
            if (val.id === itemId) {
                return {
                    id: val.id,
                    name: data
                }
            } else {
                return val
            }
        })
        board[boardIndex].items = [...items]
        localStorage.setItem("boards", JSON.stringify(board))
        let length = board.reduce((prev: any, next: any) => {
            return [...prev, ...next.items]
        }, []).length
        return { board, count: length }
    } else {
        return { board: [], count: 0 }
    }
}
export const onChangeBoard = (boardId: string, data: string): State => {
    let { board } = getBoards()
    if (board.length > 0) {
        let boardIndex = board.findIndex((item) => item.id === boardId)
        let changedBoard = { ...board[boardIndex], name: data }
        board[boardIndex] = changedBoard
        localStorage.setItem("boards", JSON.stringify(board))
        let length = board.reduce((prev: any, next: any) => {
            return [...prev, ...next.items]
        }, []).length
        return { board, count: length }
    } else {
        return { board: [], count: 0 }
    }
}

