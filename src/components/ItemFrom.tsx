import { useForm } from "react-hook-form";
import { TodoItem } from '../App.tsx'

interface ItemModalProps {
  editList?: TodoItem;
  isEdit: boolean;
  onEditList: (title:string, description:string, id:number) => void;
  onAddList: (title:string, description:string) => void;
}
interface FormValues {
  Title: string;
  Description: string;
}

const ItemForm = ({ editList, isEdit, onEditList, onAddList }:ItemModalProps) => {

  const listTitle:string = ((isEdit && editList) ? editList.title : "");
  const listDescription:string = ((isEdit && editList)?editList.description ?? "" :"");

  const { register, handleSubmit,formState: { errors }, } = useForm<FormValues>({
    defaultValues: {
      Title: listTitle,
      Description: listDescription
    }
  });
  const onSubmit = (data:FormValues) => {
    if(isEdit&&editList){
      onEditList(data.Title, data.Description, editList.id);
    }else{
      onAddList(data.Title, data.Description);
    }
  }

  return(
  <div>
    <h1>{isEdit ? "リスト編集" : "リスト追加"}</h1>
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label >タイトル</label>
        <input {...register("Title", { 
          required: "タイトルは必須です"
          })}/>
          {errors.Title && <p style={{ color: "red" }}>{errors.Title.message}</p>}
        <label >詳細</label>
        <input {...register("Description")}/>
        <button className='okButton' type="submit">OK</button>
      </form>
    </div>
  </div>
  )
};
export default ItemForm;