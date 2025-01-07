
interface BlueButtonProps {
    styles:string
    text:string | JSX.Element
    onClick:()=>void
    loadingText:string | JSX.Element
    loading:boolean
}

function BlueButton({styles,text,loading,loadingText,onClick}:BlueButtonProps): JSX.Element {
  return (
    <button className={`bg-blue-500  rounded-md hover:bg-blue-600 ${styles}`} onClick={onClick}>
        {loading?loadingText:text}
    </button>
  )
}

export default BlueButton
