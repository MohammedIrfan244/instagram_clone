import instaText from '../../assets/instagram_text.png'


interface InstaTextProps {
    styles: string
}

function InstaText({styles}:InstaTextProps) {
  return (
    <div className= {`flex justify-center items-center ${styles}`}>
      <img src={instaText} className="w-full h-full" alt="Instagram" />
    </div>
  )
}

export default InstaText
