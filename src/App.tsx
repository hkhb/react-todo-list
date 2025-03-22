import { useState } from 'react';
import "./App.css"
import Modal from './components/Modal.tsx'
import Lists from "./components/list.tsx"

export interface TodoItem {
  id: number;
  title: string;
  description?: string; // 任意の詳細情報
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;   // 更新日時（任意）
}

const initialTodoItems:TodoItem[] = [
  {id : 1, title: "掃除", description: "キッチンの掃除", completed: false, createdAt: new Date(2025, 3, 4), updatedAt: new Date(2025, 3, 4)},
  {id : 2, title: "洗濯", completed: true, createdAt: new Date(20250304)},
  {id : 3, title: "料理", description: "味噌汁", completed: false, createdAt: new Date(2025, 3, 4)},
  {id : 4, title: "掃除", description: "1234", completed: false, createdAt: new Date()},
  {id : 5, title: "掃除", completed: false, createdAt: new Date(), updatedAt: new Date()},
  {id : 6, title: "掃除", description: "true", completed: true, createdAt: new Date(2025, 3, 4)},
  {id : 7, title: "1223", description: "null", completed: false, createdAt: new Date(2025, 3, 4)},
  {id : 8, title: "", description: "", completed: false, createdAt: new Date(20250304)},
  {id : 9, title: "掃除", description: "キッチンの掃除", completed: true, createdAt: new Date(2025, 3, 4)},
  {id : 10, title: "掃除", description: "キッチンの掃除", completed: false, createdAt: new Date(20250304)},
]

function App() {

  const [todoItems, setTodoItems] = useState<TodoItem[]>(initialTodoItems);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editList, setEditList] = useState<TodoItem>();
  
  //モーダルを開く
  //引数　なし
  //戻り値　なし
  const openModal = () =>{
    setShowModal(true);
  }
  //モーダルを閉じる
  //引数　なし
  //戻り値　なし
  const closeModal = () =>{
    setShowModal(false);
    setIsEdit(false);
  }
  //モーダルをキャンセル
  //引数　なし
  //戻り値　なし
  const onModalCancel = () => {
    closeModal();
  };
  //listを受取、モーダルで編集する
  //引数　todoItem
  //戻り値　なし
  const onListClick = (todoItem:TodoItem) => {
    setIsEdit(true);
    setEditList(todoItem);
    openModal();
  }
  //新しいリストの追加
  //引数　title, dedcriotion
  //戻り値　なし
  const onAddList = (title:string, description:string) => {
    if(!!title){
      const newTodo:TodoItem = {
        id: todoItems.length + 1,
        title,
        description,
        completed: false,
        createdAt: new Date(),
      }
      setTodoItems([...todoItems, newTodo]);
      closeModal();
    }else{
      alert("titleを入力してください")
    }
  }
  // 編集したものものを受取、リストに反映させる
  //引数　title, dedcriotion, id
  //titleがある場合
  //戻り値　なし
  //titleがない場合
  //alartを出す
  //戻り値　なし
  const onEditList = (title:string, description:string, id:number) => {
    if(!title){
      alert("titleを入力してください")
      return;
    }
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? {...item, title: title, description: description, updatedAt: new Date() } : item
    ));
    closeModal();
  }
  //リストの削除
  //引数 id
  //idがある場合 
  //alartを出す(削除OK？)
  //戻り値なし
  //idがない場合 
  //alartを出す(idがない)
  //戻り値なし 
  //現在のtodolistを新しい変数で受け取る
  //リストごとに分割
  //idが同じでない場合、newtodolistに格納 
  //idが同じ場合、何もしない
  //setterでnewtodolistに変更
  const onDelete = (id:number) =>{
    if(!id){
      alert("idがありません")
      return;
    }
    const prevtodoItems:TodoItem[] = todoItems
    const newtodoItems:TodoItem[] = 
    prevtodoItems.filter((Item:TodoItem) => Item.id !== id
    )
    setTodoItems(newtodoItems);
    alert("削除しますか？")
  }

  return (
    <div className='container'>
      <h1>TODOlist</h1>
      <div className='open-modal' >
        <button onClick={openModal}>新規作成</button>
        <Modal
          showFlag={showModal}
          onCancel={onModalCancel}
          onOk={isEdit&&editList ? (title, description) => {onEditList(title, description, editList.id)} : onAddList}
          title={(isEdit && editList) ? editList.title : ""}
          description={(isEdit && editList)?editList.description ?? "" :""}
          modalTitle={isEdit ? "リスト編集" : "リスト追加"}
        >
        </Modal>
      </div>
      <ul>
        {todoItems.map((todoItem)=> (
          <Lists
            key={todoItem.id}
            {...todoItem}
            onClickEdit={() => onListClick(todoItem)}
            onClickDelete={() => onDelete(todoItem.id)}
          /> 
        ))}
      </ul>
    </div>
  )
}

export default App;