import { Diary } from "../types"

interface DiaryShowProps {
  diary: Diary;
}

const DiaryShow = ({ diary: { date, weather, visibility } }: DiaryShowProps): JSX.Element => {
  return (
    <li>
      <h3>{date}</h3> | weather: {weather} | visibility: {visibility} |
    </li>
  )
}

export default DiaryShow