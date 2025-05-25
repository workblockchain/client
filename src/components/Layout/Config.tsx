import {useNavigate} from "react-router"
import {usePomodoroTimer} from "../../stores/usePomodoroTimer"
import {ConfigLayout} from "./ConfigLayout"

function Config() {
  const {workDuration, setWorkDuration, breakDuration, setBreakDuration} =
    usePomodoroTimer()
  const configProps = {
    workDuration,
    breakDuration,
    setWorkDuration,
    setBreakDuration,
  }
  const navigate = useNavigate()
  return <ConfigLayout {...configProps} onClose={() => navigate(-1)} />
}

export default Config
