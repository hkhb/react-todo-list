import { useState, useEffect} from 'react';
import "./App.css"
import Modal from './components/Modal.tsx'
import Lists from "./components/list.tsx"
import ItemModal from "./components/ItemModal.tsx"

export interface TodoItem {
  id: number;
  title: string;
  description?: string; // 任意の詳細情報
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date; // 更新日時（任意）
}

function App() {

  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editList, setEditList] = useState<TodoItem>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedItem = localStorage.getItem('todoItems');
  
    if (storedItem) {
        const parsedItems: TodoItem[] = JSON.parse(storedItem).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
        }));
        setTodoItems(parsedItems);
        setIsLoaded(true);
        console.log("find!!!!!!!!!!")
      }else{
      setTodoItems([]);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if(isLoaded){
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
      console.log("save!!!!!!!!!!")
    }
  },[todoItems])
  
  //モーダルを開く
  //引数　なし
  //戻り値　なし
  const openModal = () => {
    setShowModal(true);
  };
  //モーダルを閉じる
  //引数　なし
  //戻り値　なし
  const closeModal = () => {
    setShowModal(false);
    setIsEdit(false);
  };
  //モーダルをキャンセル
  //引数　なし
  //戻り値　なし
  const onModalCancel = () => {
    closeModal();
  };
  //listを受取、モーダルで編集する
  //引数　todoItem
  //戻り値　なし
  const onClickList = (todoItem: TodoItem) => {
    setIsEdit(true);
    setEditList(todoItem);
    openModal();
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
    const confirm:boolean = window.confirm("本当に削除しますか？");
    if(confirm){
      const prevtodoItems:TodoItem[] = todoItems
      const newtodoItems:TodoItem[] = 
        prevtodoItems.filter((Item:TodoItem) => Item.id !== id
        )
      setTodoItems(newtodoItems);
    }
  }
  const onAddList = (title:string, description:string) => {
    if(!!title){
      const newId:number = Math.max(0,...todoItems.map(item => item.id)) +1;
      const newTodo:TodoItem = {
        id: newId,
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
  //戻り値　なし
  //titleがない場合は、alartを出す
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
  
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const ListTitle:string = ((isEdit && editList) ? editList.title : "");
  const ListDescription:string = ((isEdit && editList)?editList.description ?? "" :"");

  //listの追加、編集のモーダル
  // 引数　なし
  // 戻り値　なし
  // isEditとeditListがあればonEditListを実行
  // なければonAddListを実行

  function onOk(){
    if(isEdit&&editList){
      onEditList(newTitle, newDescription, editList.id);
    }else{
      onAddList(newTitle, newDescription);
    }
  };

  useEffect(() => {
    setNewTitle(ListTitle);
    setNewDescription(ListDescription);
  }, [ListTitle, ListDescription, showModal]);

  const list = editList? editList : undefined;

  return (
    <div className="container">
      <h1>TODOlist</h1>
      <div className="open-modal">
        <button onClick={openModal}>新規作成</button>
        <Modal
          showFlag={showModal}
          onCancel={onModalCancel}
        >
          <div>
            <ItemModal
              editList={list}
              isEdit={isEdit}
              onEditList={onEditList}
              onAddList={onAddList}
              />
          </div>
        </Modal>
      </div>
      <ul>
        {todoItems.map((todoItem) => (
          <Lists
            key={todoItem.id}
            {...todoItem}
            onClickEdit={() => onClickList(todoItem)}
            onClickDelete={() => onDelete(todoItem.id)}
          /> 
        ))}
      </ul>
    </div>
  );
}

export default App;
