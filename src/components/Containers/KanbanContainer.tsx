import {KanbanBoard} from "../Kanban/KanbanBoard"

export function KanbanContainer() {
  const data = {
    id: "board1",
    title: "看板 1",
    list: [
      {
        id: "card 1",
        title: "待办",
        cards: [
          {id: "eat", title: "吃", description: "222"},
          {id: "sleep 1", title: "睡"},
          {id: "eat11", title: "吃", description: "222"},
          {id: "sleep111", title: "睡"},
          {id: "eat1111", title: "吃", description: "222"},
          {id: "sleep111111", title: "睡"},
          {id: "eat11111", title: "吃", description: "222"},
          {id: "sleep11111", title: "睡"},
        ],
      },
      {
        id: "card 2",
        title: "进行中",
        cards: [{id: "card3", title: "Task 3"}],
      },
    ],
  }

  return <KanbanBoard id={data.id} title={""} list={data.list} />
}

export default KanbanContainer
