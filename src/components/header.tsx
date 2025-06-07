import { useEffect, useState } from "react"
import "./header.css"
// headerに完了ボタンと未完了ボタンを作成　タイトルも作成
// 完了ボタンを押すと完了しているリストが表示と非表示が切り替わる(デフォルト：表示)
// 未完了ボタンを押すと未完了なリストが表示と非表示が切り替わる(デフォルト：表示)
// app.tsxでフィルター処理
// 引数：フィルター処理関数
// 
// 
// s
interface headerprops {
  onSortList:(completed:boolean) => void;
}

function Header({onSortList}:headerprops) {

  const [completed, setCompleted] = useState(true);

  const onCompleted = () =>{
    setCompleted(true);
  }
  const onUnComplete = () =>{
    setCompleted(false);
  }

  useEffect (() => {
    onSortList(completed)
  }, [completed])

  return(
    <div className="header-container">
      <h1>TODOlist</h1>
      <div className="button-field">
        <button
          className={completed ? "btn active completed" : "btn"}
          onClick={onCompleted}
        >
          完了
        </button>
        <button
          className={completed ? "btn" : "btn active unComplete"}
          onClick={onUnComplete}
        >
          未完了
        </button>
      </div>
    </div>
  )
}

export default Header;