import { useState } from "react"
import { NewDiary, Visibility, Weather } from "../types";

interface DiaryFormProps {
  addNewDiary: (diary: NewDiary) => Promise<boolean>;
}

const DiaryForm = (props: DiaryFormProps): JSX.Element => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [comment, setComment] = useState("");

  const diaryCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (visibility && weather) {
      const diaryToAdd: NewDiary = {
        date,
        visibility,
        weather,
        comment,
      };      

      const sucess = await props.addNewDiary(diaryToAdd);

      if (sucess) {
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      }
    } 
  }

  return (
    <div>
      <form onSubmit={diaryCreation}>
        <div>
          date <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            />
        </div>
        <div>
          {Object.values(Visibility).map((visibilityType) => (
            <label key={visibilityType}>
              <input 
                type="radio"
                name="visibility"
                value={visibilityType}
                checked={visibility === visibilityType}
                onChange={(event) => setVisibility(event.target.value as Visibility)}
                />
                {visibilityType}
            </label>
          ))}
        </div>
        <div>
          {Object.values(Weather).map((weatherType) => (
            <label key={weatherType}>
              <input 
                type="radio"
                name="weather"
                value={weatherType}
                checked={weather === weatherType}
                onChange={(event) => setWeather(event.target.value as Weather)}
                />
                {weatherType}
            </label>
          ))}
        </div>
        <div>
          comment <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default DiaryForm