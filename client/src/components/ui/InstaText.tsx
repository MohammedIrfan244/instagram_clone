import { useNavigate } from 'react-router-dom'
import instaText from '../../assets/instagram_text.png'


interface InstaTextProps {
    styles: string
}

function InstaText({styles}:InstaTextProps) {
  const navigate=useNavigate()
  return (
    <div className= {`flex justify-center items-center ${styles}`} onClick={()=>navigate('/')} >
      <img src={instaText} className="w-full h-full" alt="Instagram" />
    </div>
  )
}

export default InstaText
