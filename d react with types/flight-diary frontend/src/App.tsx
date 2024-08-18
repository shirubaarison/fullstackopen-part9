import { useEffect, useState } from 'react'
import './App.css'
import { Diary, NewDiary } from './types'
import { createDiary, getAllDiaries } from './services/diaresServices';
import DiaryShow from './components/Diary';
import DiaryForm from './components/DiaryForm';
import axios from 'axios';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, [])


  const addNewDiary = async (diary: NewDiary): Promise<boolean> => {
      try {
      const data = await createDiary(diary);
      setDiaries(diaries.concat(data));
      setError("");
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data);
        }
      } else {
        console.error(error);
      }
      return false;
    }
   }

  return (
    <>
      <div>
        <h3>Diary form</h3>
        {error !== "" && <div><p id="error">{error}</p></div>}
        <DiaryForm addNewDiary={addNewDiary} />
      </div>
      <h2>Diaries entries</h2>
      <div>
        <ul>
          {diaries.map(diary => 
            <DiaryShow key={diary.id} diary={diary}/>
          )}
        </ul>
      </div>
    </>
  )
}

export default App
